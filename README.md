untar-all
=========
Untars all the files in a tar stream.

Example
=======

```javascript
var untarAll = require("untar-all")

untarAll(process.stdin, function(err, result) {
  console.log("tar stream contents:", results)
})
```

Install
=======

    npm install untar-all


### `require("untar-all)(stream, callback(err, result) )`
Untars a tar stream in memory.

* `stream` is a stream which gets untar'd
* `callback(err, result)` gets the results of untarring the stream

## Credits
(c) 2013 Mikola Lysenko. MIT License