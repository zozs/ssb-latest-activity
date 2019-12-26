const awaitable = require('pull-awaitable')
const flatmap = require('pull-flatmap')
const pullSort = require('pull-sort')
const pull = require('pull-stream')
const ssbClientCb = require('ssb-client')

const { promisify } = require('util')
const ssbClient = promisify(ssbClientCb)

main().catch(err => console.error(`unhandled top-level exception: ${err}`))

async function main () {
  try {
    const sbot = await ssbClient()

    // Get a stream of the latest actions from everyone I follow (including myself)
    const latestStream = pull(
      sbot.friends.hopStream(),
      flatmap(e => Object.entries(e)), // expand stream to consist of [id, hops]-elements.
      pull.filter(([id, hops]) => hops >= 0 && hops <= 1), // only myself and those i follow.
      pull.map(([id, hops]) => sbot.createUserStream({ // get latest activity for each friend
        id,
        reverse: true,
        limit: 1
      })),
      pull.flatten(), // stream of streams => stream
      pullSort((a, b) => b.value.timestamp - a.value.timestamp) // optional, causes buffering.
    )

    for await (const post of awaitable(latestStream)) {
      // For each post (one per user), get the latest self-assigned username for the id.
      const id = post.value.author
      const name = await promisify(sbot.about.socialValue)({ key: 'name', dest: id })

      const timestamp = new Date(post.value.timestamp).toISOString()
      const type = post.value.content.type || '(unknown)'
      console.log(`${id} ${timestamp} (${name}) type: ${type}`) 
    }

    sbot.close()
  } catch (e) {
    console.error('Something went wrong! Is ssb-server running?')
    console.error(`Got error: ${e}`)
  }
}
