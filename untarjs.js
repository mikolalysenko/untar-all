"use strict"

var tar = require("tar")

function untarAll(tarStream, cb) {
  var result = {}
  var counter = 1
  function decrementCounter() {
    if(--counter === 0) {
      cb(undefined, result)
    }
  }
  tarStream.pipe(tar.Parse())
    .on("entry", function (e) {
      if(counter < 0) {
        return
      }
      var props = e.props
      var p = e.props.path
      var n = 0
      var r = []
      result[p] = []
      ++counter
      e.on("data", function (c) {
        r.push(c)
        n += c.length
      })
      e.on("end", function () {
        var b = new Buffer(n)
        for(var ptr=0,i=0; i<r.length; ++i) {
          var c = r[i]
          c.copy(b, ptr)
          ptr += c.length
        }
        result[p] = b.toString()
        decrementCounter()
      })
    })
    .on("error", function(e) {
      counter = -1
      cb(undefined, result)
    })
    .on("end", function(e) {
      decrementCounter()
    })
}

module.exports = untarAll