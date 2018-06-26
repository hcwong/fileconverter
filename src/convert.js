const ffmpeg = require('fluent-ffmpeg');
const async = require('async');
const util = require('util');
const fs = require('fs');

const unlink = util.promisify(fs.unlink);

async function convertFile(directory, filename) {
  try {
    await ffmpegConverter(directory, filename);
    unlink(`${directory}/${filename}`);
    return `${directory}/${filename}-edit`;
  } catch (err) {
    return 'Error happened while converting file'; // TODO: Throw a proper error?
  }
}

async function ffmpegConverter(directory, filename) {
  return new Promise((resolve, reject) => {
    ffmpeg(`${directory}/${filename}`)
      // TODO: Check the input format. Might not be always M4a
      .inputFormat('m4a')
      .audioChannels(1)
      .toFormat('flac')
      .on('start', function(c) {
        console.log('Spawned Ffmpeg with command');
      })
      .on('stderr', function(stderrLine) {
        console.log('Stderr output: ' + stderrLine);
      })
      .on('error', function(err, stdout, stderr) {
        console.log('Cannot process video: ' + err.message);
        console.log(stdout);
        console.log(stderr);
        reject();
      })
      .on('progress', function(progress) {
        console.log('Processing: ' + progress.percent + '% done');
      })  
      .on('end', function() {
        console.log('File has been converted succesfully');
        resolve();
      })
      .save(`${directory}/${filename}-edit`); 
  });
} 

module.exports.convertFile = convertFile;