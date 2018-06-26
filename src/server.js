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
const unlink = util.promisify(fs.unlink);

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
  try {
     // Verify the file size and file type again before proceeding
    if (!(verify.verifyFileSize(req.file.size) && verify.verifyFileType(req.file.mimetype))) {
      res.sendStatus(400);
    }
    let convertedFileLocation = await convert.convertFile(req.file.destination, req.file.filename);
    console.log(convertedFileLocation);
    res.sendFile(convertedFileLocation, (err) => {
      if (err) {
        console.log(err);
      } else {
        unlink(convertedFileLocation);
      }
    });
  } catch (err) {
    console.log('Error while converting file', err);
    res.status(501).send({Error: '501: Error while converting the file'});
  }
});

console.log(`Server started on PORT ${PORT}`);
app.listen(5000);