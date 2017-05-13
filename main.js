var cheerio = require('cheerio');
var request = require('request');
var HouseParser = require('./parser.js');
var mongoose = require('mongoose');
var House = require('./models/House.js');
var opts = {
  server: {
    socketOptions: { keepAlive: 1 }
  }
};

var connectString = 'mongodb://kalanchen:12345678@ds159737.mlab.com:59737/house';
mongoose.connect(connectString, opts);


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function searchHouse(url, currentPage) {
  request(url, async(err, res, body) => {
    var $ = cheerio.load(body);
    var totalNum = $('.pageNum-form').data('total');

    var allPages = +totalNum / 30;

    await sleep(10000);

    if (currentPage < allPages) {
      await sleep(4000);
      $('#content > .listInfo').each(async(i, elm) => {
        const url = 'https:' + $(elm).find('a').attr('href').trim();
        
        request(url, async(err, res, houseBody) => {
          var houseParser = new HouseParser(houseBody, url);
          var houseInfo = houseParser.getAllInfo();          
          House.find({ title: houseInfo.houseTitle }).exec((err, datas) => {
            if (datas.length === 0) {
              console.log('not in database, store data...');
              new House({
                femaleOnly: houseInfo.femaleOnly,
                title: houseInfo.houseTitle,
                landlordInfo: houseInfo.landlordInfo,
                price: houseInfo.price,
                details: houseInfo.details,
                houseIntro: houseInfo.houseIntro,
                houseDetail: houseInfo.houseIntro,
              }).save();
            } else {
              console.log('already in database skip...');
            }
          });
        });
        await sleep(4000);
      });
      searchHouse(url + '&firstRow=' + currentPage * 30 + '&totalRow=' + totalNum, ++currentPage);
    }
  })
}

// [TODO] add search result to database.
searchHouse('https://rent.591.com.tw/new/?kind=0&region=1&section=7,5,3,4,1&rentprice=9000,13500&area=7,12', 1)