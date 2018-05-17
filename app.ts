import fs = require('fs');
import chokidar = require('chokidar');
import child = require('child_process');

const targetDirectory : string = process.argv[2];

var files: string[] = fs.readdirSync(targetDirectory);
files.forEach(file => {
    if (file.indexOf('.mkv') > -1) {
        var tempFile: string = file.replace(/(\.[\w\d_-]+)$/i, '_temp$1');
        child.execSync(('ffmpeg -i %file% -c:v copy -c:a aac -vbr 3 ' + targetDirectory + '/' + tempFile).replace(/%file%/g, targetDirectory + '/' + file));
        child.execSync(('mv %file%.processing ' + targetDirectory + '/' + tempFile).replace(/%file%/g, targetDirectory + '/' + file));
    }
});

