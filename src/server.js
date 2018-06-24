const express = require('express'); 
const async = require('async');
const path = require('path');
const morgan = require('morgan');
const multer = require('multer');
const tmp = require('tmp');
const fs = require('fs');
const util = require('util');

const convert = require('./convert');
const verify = require('./verify');

const app = express();
const tmpdir = tmp.dirSync();
const upload = multer({dest: tmpdir.name});
const ROOT = path.resolve(__dirname+'/../');

const PORT = 5000 || process.env.PORT;
const accessLogStream = fs.createWriteStream(`${ROOT}/log/access.log`, {flags: 'a'});
app.use('/static', express.static(`${ROOT}/assets/javascript`));
app.use(morgan('short', {stream: accessLogStream}));

app.get('/', async (req, res) => {
  res.sendFile(`${ROOT}/assets/views/index.html`);
  // TODO: CSRF Token? Though its probably unnecessary since theres no cookies or logins
});

app.post('/upload', upload.single('mp4-upload'), async (req, res) => {
  console.log('File:', req.file);
  // Verify the file size and file type again before proceeding
  if (!(verify.verifyFileSize(req.file.size) && verify.verifyFileType(req.file.mimetype))) {
    res.sendStatus(400);
  }

  let convertedFileLocation = await convert.convertFile(req.file.destination, req.file.filename);
  console.log(convertedFileLocation);
  res.send('Placeholder'); // TODO: Send the proper response via AJAX?
  // Delete the file from tmp storage now (even if its in the tmp folder)
  // TODO: Use res.attachment
  const unlink = util.promisify(fs.unlink);
  try {
    await unlink(convertedFileLocation);
  } catch (err) {
    console.log('Error while deleting file', err);
  }
});

console.log(`Server started on PORT ${PORT}`);
app.listen(5000);