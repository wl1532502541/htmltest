const express = require('./mini-express.js');

const app = new express();

app.get('/test', (req, res, next) => {
  console.log('你进入了/test的第一个路由');
  next();
})

app.get('/test', (req, res, next) => {
  console.log('你进入了/test的第二个路由')
})

app.listen(8888, (err) => {
  !err && console.log('没错误')
})