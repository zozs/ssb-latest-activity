# ssb-latest-activity

Show latest activity of people you follow, useful to, e.g., ensure your pub still sees new stuff.

## :heavy_check_mark: Things to use it for

* Ensure your ssb pub/client has received the latest updates, without manually inspecting a stream of JSON objects.
* Check in on your friends so they are all right, if they haven't been active for a while.

## :x: Things to NOT use it for

* Like, be creepy and stalk people. Just don't.

## :running: Running and example output

```
[linus@laptop]$ node latest-activity.js
2019-12-26T11:31:42.134Z (test1) type: vote
2019-12-26T10:49:48.936Z (zozs) type: git-update
2019-12-26T06:31:43.431Z (yayayaya) type: vote
2019-12-25T23:10:58.398Z (test2) type: contact
2019-12-25T21:00:00.000Z (test3) type: (unknown)
2019-12-25T17:32:26.452Z (example) type: vote
2019-12-25T08:30:10.650Z (test5) type: post
2019-12-15T15:13:46.906Z (ssb.zozs.se) type: contact
2019-11-27T03:04:43.677Z (The Weekly) type: post
```

You can also get the long ids by calling the script with `--id`

```
[linus@laptop]$ node latest-activity.js --id
@geQl+Lnoch9HdZbOUfiEXWDoanWXEDbGBfSy9/EWOoo=.ed25519 2019-12-26T11:31:42.134Z (test1) type: vote
@S1h5yat/vRFUJw7ft5+U661/AblIZsdDCA6ZGOb7814=.ed25519 2019-12-26T10:49:48.936Z (zozs) type: post
@4djb2cUbKMgjp9nIsaXT0YN1/3ksT6wJCvnoG/GMsIU=.ed25519 2019-12-26T06:31:43.431Z (yayayaya) type: vote
@hGyy0RXjA9I91KYoHt23z0SRAoIbSMdf4pMo1t7SZfQ=.ed25519 2019-12-25T23:10:58.398Z (test2) type: contact
@UfaJk7PVJpmkiq4+WZ+BqIsFrKlOWgNcipz6fycX1qY=.ed25519 2019-12-25T21:00:00.000Z (test3) type: (unknown)
@PrfNx6LOH+fTtqDiB1wOyOzUOlBv1HHmVqYbHf57KMU=.ed25519 2019-12-25T17:32:26.452Z (example) type: vote
@JKRQ59PNIj+mj5rGsfI7FN0hFUX1PEd4nCUIhSlsCFU=.ed25519 2019-12-25T08:30:10.650Z (test5) type: post
@Dg0PUvvq+IsEkD+iQpKfMiDh9/LkqaabHgQJU05O6z0=.ed25519 2019-12-15T15:13:46.906Z (ssb.zozs.se) type: contact
@iVPi/B73hJSpsUB8XbSnlxe3NembPXLjOfIexlYdgJA=.ed25519 2019-11-27T03:04:43.677Z (The Weekly) type: post
```
