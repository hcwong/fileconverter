const express = require('express');
const async = require('async');
const path = require('path');
const morgan = require('morgan');

const app = express();
const PORT = 5000 || process.env.PORT;
const root = path.resolve(__dirname+'/../');

// Serve static files
app.use('/static', express.static(`${root}/assets/javascript`));

app.get('/', async (req, res) => {
  res.sendFile(`${root}/assets/views/index.html`);
  // TODO: CSRF Token? Though its probably unnecessary since theres no cookies or logins
});

app.post('/upload', async (req, res) => {
  console.log (req);
});

console.log(`Server started on PORT ${PORT}`);
app.listen(5000);