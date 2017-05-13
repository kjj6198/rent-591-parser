var express = require('express');
var app     = express();
var mongoose = require('mongoose');
var opts = {
  server: {
    socketOptions: { keepAlive: 1 }
  }
};

var connectString = 'mongodb://kalanchen:12345678@ds159737.mlab.com:59737/house';
mongoose.connect(connectString, opts);
var House = require('./models/House');

app.get('/search', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const q = House.find().limit(200).exec((err, houses) => {
    res.json({ houses: houses });
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('server running');
}); 