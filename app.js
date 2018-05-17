"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var child = require("child_process");
var targetDirectory = process.argv[2];
var files = fs.readdirSync(targetDirectory);
files.forEach(function (file) {
    if (file.indexOf('.mkv') > -1) {
        var tempFile = file.replace(/(\.[\w\d_-]+)$/i, '_temp$1');
        child.execSync(('ffmpeg -i %file% -c:v copy -c:a aac -vbr 3 ' + targetDirectory + '/' + tempFile).replace(/%file%/g, targetDirectory + '/' + file));
        child.execSync(('mv %file%.processing ' + targetDirectory + '/' + tempFile).replace(/%file%/g, targetDirectory + '/' + file));
    }
});
