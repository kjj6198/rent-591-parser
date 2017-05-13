var express = require('express');
var app     = express();
var searchHouse =  require('./main.js');

app.get('/search', (req, res) => {
  // searchHouse();
  res.json({ hello: 'world' })
});

app.listen(3000, () => {
  console.log('server running')
}); 