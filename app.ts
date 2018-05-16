import fs = require('fs');
import chokidar = require('chokidar');
import child = require('child_process');

const targetDirectory : string = process.argv[2];
const commandTemplate : string = process.argv[3];
const startupTime: number = new Date().getTime();
const processed: string[] = [];

console.log('Starting node command crawler on: ' + targetDirectory);
chokidar.watch(targetDirectory, {
    ignored: /(^|[\/\\])\../,
        awaitWriteFinish: {
            stabilityThreshold: 30000,
            pollInterval: 250
        }
    }).on('add', (path) => {
    if (fs.statSync(path).ctimeMs > startupTime && processed.indexOf(path) < 0) {
        console.log('Found file: ' + path);
        var tempPath: string = path.replace(/(\.[\w\d_-]+)$/i, '_large$1');
        child.exec(('ffmpeg %file% -c:v copy -c:a aac -vbr ' + tempPath).replace(/%file%/g, path), execCallback);
        child.exec(('mv %file%.processing ' + tempPath).replace(/%file%/g, path));
        processed.push(path);
        console.log('Finished processing file: ' + path);
    }
});

function execCallback(error: Error | null, stdout: string, stderr: string) {
    console.log(error);
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
}