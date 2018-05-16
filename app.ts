import fs = require('fs');
import chokidar = require('chokidar');
import child = require('child_process');

const targetDirectory : string = process.argv[2];

var files: string[] = fs.readdirSync(targetDirectory);
files.forEach(file => {
    var tempFile: string = file.replace(/(\.[\w\d_-]+)$/i, '_temp$1');
    child.execSync(('ffmpeg -i %file% -c:v copy -c:a aac -vbr 3 ' + tempFile).replace(/%file%/g, file));
    child.execSync(('mv %file%.processing ' + tempFile).replace(/%file%/g, file));
});

