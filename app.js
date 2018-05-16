"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var chokidar = require("chokidar");
var child = require("child_process");
var targetDirectory = process.argv[2];
var commandTemplate = process.argv[3];
var startupTime = new Date().getTime();
var processed = [];
console.log('Starting node command crawler on: ' + targetDirectory);
chokidar.watch(targetDirectory, { ignored: /(^|[\/\\])\../ }).on('add', function (path) {
    if (fs.statSync(path).ctimeMs > startupTime && processed.indexOf(path) < 0) {
        console.log('Found file: ' + path);
        child.exec('ffmpeg %file% -c:v copy -c:a aac -vbr 3 %file%.processing'.replace('%file%', path));
        child.exec('mv %file%.processing %file%'.replace('%file%', path));
        processed.push(path);
        console.log('Finished processing file: ' + path);
    }
});
