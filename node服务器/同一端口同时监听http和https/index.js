'use strict';
let express = require('express');
let fs = require('fs');

let httpx = require('./httpx');

let opts = {
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.crt')
};

let app = express();
app.use(express.static('public'));

let server = httpx.createServer(opts, app);
server.listen(8080, () => console.log('Server started'));

app.get('/', function (req, res) {
  if (req.protocol === 'https') {
    res.status(200).send('Welcome to Safety Land!')
  } else {
    res.status(200).send('Welcome!')
  }
})