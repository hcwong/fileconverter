const ffmpeg = require('fluent-ffmpeg');
const async = require('async');

async function convertFile(directory, filename) {
  try {
    // TODO: Rewrite this in async manner
    await ffmpeg(`${directory}/${filename}`)
      // TODO: Check the input format. Might not be always M4a
      .inputFormat('m4a')
      .audioChannels(1)
      .toFormat('flac')
      // .on('start', function(c) {
      //   console.log('Spawned Ffmpeg with command');
      // })
      // .on('stderr', function(stderrLine) {
      //   console.log('Stderr output: ' + stderrLine);
      // })
      // .on('error', function(err, stdout, stderr) {
      //   console.log('Cannot process video: ' + err.message);
      //   console.log(stdout);
      //   console.log(stderr);
      //   throw err;
      // })
      // .on('progress', function(progress) {
      //   console.log('Processing: ' + progress.percent + '% done');
      // })  
      // .on('end', function() {
      //   console.log('File has been converted succesfully');
      // })
      // .save(`${directory}/${filename}`); 
      
    //delete the original file
    fs.unlink(`${directory}/${filename}`, (err) => {
      if (err) throw err;
      console.log('original file deleted');
    });
    return `${directory}/${filename}.flac`;
  } catch (err) {
    return 'Error happened while converting file';
  }
}

module.exports.convertFile = convertFile;