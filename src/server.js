const express = require('express');
const async = require('async');
const morgan = require('morgan');

const app = express();
const PORT = 5000 || process.env.PORT;

app.get('/', async (req, res) => {
  res.send('./../assets/views/index.html');
  // TODO: res.send cookie as well containing CSRF Token
});

app.post('/upload', async (req, res) => {
  console.log (req);
  // TODO: need to probably check what is being sent. Also should also get a linter
});

console.log(`Server started on PORT ${PORT}`);
app.listen(5000);


