import fs = require('fs');
import chokidar = require('chokidar');
import child = require('child_process');

const targetDirectory : string = process.argv[2];
const commandTemplate : string = process.argv[3];
const startupTime: number = new Date().getTime();
const processed: string[] = [];

console.log('Starting node command crawler on: ' + targetDirectory);
chokidar.watch(targetDirectory, {ignored: /(^|[\/\\])\../}).on('add', (path) => {
    if (fs.statSync(path).ctimeMs > startupTime && processed.indexOf(path) < 0) {
        console.log('Found file: ' + path);
        child.exec('ffmpeg %file% -c:v copy -c:a aac -vbr 3 %file%.processing'.replace('%file%', path));
        child.exec('mv %file%.processing %file%'.replace('%file%', path));
        processed.push(path);
        console.log('Finished processing file: ' + path);
    }
});