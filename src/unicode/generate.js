// const fs = require('fs')
// const path = require('path')
// const BufferStream = require('bufferstream')
// const forEach = require('lodash/forEach')

// generate({
//     source: path.join(__dirname, 'glyphlist.txt'),
//     output: path.join(__dirname, 'table.js')
// })

var fs = require('fs'),
    util = require('util'),
    stream = require('stream'),
    es = require('event-stream')

var lineNr = 0

var s = fs.createReadStream('src/unicode/glyphlist.txt')
    .pipe(es.split())
    .pipe(es.mapSync(function (line) {
        s.pause();

        //lineNr += 1;

        console.log(line)

        // process line here and call s.resume() when rdy
        // function below was for logging memory usage
        //logMemoryUsage(lineNr);

        s.resume();
    })
        .on('error', function (err) {
            console.log('Error while reading file.', err);
        })
        .on('end', function () {
            console.log('Read entire file.')
        })
    );