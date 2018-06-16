const express = require('express'); 
const async = require('async');
const path = require('path');
const morgan = require('morgan');
const multer = require('multer');
const tmp = require('tmp');
const fs = require('fs');

const app = express();
const tmpdir = tmp.dirSync();
const upload = multer({dest: tmpdir.name});
const ROOT = path.resolve(__dirname+'/../');

const PORT = 5000 || process.env.PORT;
const accessLogStream = fs.createWriteStream(`${ROOT}/access.log`, {flags: 'a'});
app.use('/static', express.static(`${ROOT}/assets/javascript`));
app.use(morgan('short', {stream: accessLogStream}));

app.get('/', async (req, res) => {
  res.sendFile(`${ROOT}/assets/views/index.html`);
  // TODO: CSRF Token? Though its probably unnecessary since theres no cookies or logins
});

app.post('/upload', upload.single('mp4-upload'), async (req, res) => {
  console.log('File:', req.file);
  // TODO: Do conversion here
  res.send('Placeholder');
  // TODO: After conversion, remove file from tmp storage
});

console.log(`Server started on PORT ${PORT}`);
app.listen(5000);