const flatmap = require('pull-flatmap')
const pull = require('pull-stream')
const ssbClient = require('ssb-client')

ssbClient(async (err, sbot) => {
  if (err) {
    console.error('Failed to connect to ssb-server')
    throw err
  }

  pull(
    sbot.friends.hopStream(),
    flatmap(e => Object.entries(e)), // expand stream to consist of [id, hops]-elements.
    pull.filter(([id, hops]) => hops >= 0 && hops <= 1), // only myself and those i follow.
    pull.map(([id, hops]) => sbot.createUserStream({ // get latest activity for each friend
      id,
      reverse: true,
      limit: 1
    })),
    pull.flatten(), // stream of streams => stream
    pull.map(extractLatestInfo), // make raw post to something easier to manage.
    flatmap(e => [ // make stream a mix of latest-posts and about-posts.
      pull.values([e]),
      pull(
        sbot.links({
          source: e.id,
          dest: e.id,
          rel: 'about',
          values: true
        }),
        pull.filter(data => data.value.content.name !== undefined),
        pull.map(extractAboutInfo)
      )]),
    pull.flatten(), // stream of streams => stream
    pull.reduce( // for each id, keep last self-assigned username and post info.
      (acc, e) => ({ ...acc, ...{ [e.id]: { ...acc[e.id], ...e } } }),
      {},
      (err, resultObj) => {
        // first sort results based on timestamp (reverse)
        const results = Object.values(resultObj)
        results.sort((a, b) => b.timestamp - a.timestamp)
        results.map(logInfoRow2)
        sbot.close()
      }
    )
  )
})

function extractAboutInfo (post) {
  return {
    id: post.value.content.about,
    name: post.value.content.name
  }
}

function extractLatestInfo (post) {
  return {
    id: post.value.author,
    timestamp: post.value.timestamp,
    type: post.value.content.type || '(unknown)'
  }
}

function logInfoRow2 (friend) {
  const timestamp = new Date(friend.timestamp).toISOString()
  console.log(`${friend.id} ${timestamp} (${friend.name}) type: ${friend.type}`)
}
