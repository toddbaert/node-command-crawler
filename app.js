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
chokidar.watch(targetDirectory, {
    ignored: /(^|[\/\\])\../,
    awaitWriteFinish: {
        stabilityThreshold: 30000,
        pollInterval: 250
    }
}).on('add', function (path) {
    if (fs.statSync(path).ctimeMs > startupTime && processed.indexOf(path) < 0) {
        console.log('Found file: ' + path);
        child.exec('ffmpeg %file% -c:v copy -c:a aac -vbr 3 %file%.processing'.replace(/%file%/g, path), execCallback);
        child.exec('mv %file%.processing %file%'.replace(/%file%/g, path));
        processed.push(path);
        console.log('Finished processing file: ' + path);
    }
});
function execCallback(error, stdout, stderr) {
    console.log(error);
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
}
