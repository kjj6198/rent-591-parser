var cheerio = require('cheerio');
var request = require('request');
var HouseParser = require('./parser.js');
var pg = require('pg');

var connect = 'postgres://localhost/rentinfo';

// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// async function demo() {
//   console.log('Taking a break...');
//   await sleep(2000);
//   console.log('Two second later');
// }

// demo();

pg.connect(connectionString, onConnect);

function onConnect(err, client, done) {
  //Err - This means something went wrong connecting to the database.
  if (err) {
    console.error(err);
    process.exit(1);
  }

  //For now let's end client
  client.end();
}

function searchHouse(url, currentPage) {
  console.log('parseing house page... 目前頁數為' + currentPage);
  request(url, (err, res, body) => {
    var $ = cheerio.load(body);
    var totalNum = $('.pageNum-form').data('total');

    var allPages = +totalNum / 30;
    if (currentPage < allPages) {
      $('#content > .listInfo').each((i, elm) => {
        const url = 'https:' + $(elm).find('a').attr('href').trim();
        sleep(4000);
        // request(url, (err, res, houseBody) => {
          // var houseParser = new HouseParser(houseBody, url);
          // sleep(4000);
        // });
        sleep(4000);
      });

      searchHouse(url + '&firstRow=' + currentPage * 30 + '&totalRow=' + totalNum, ++currentPage);
      sleep(10000);
    }
  })
}

searchHouse('https://rent.591.com.tw/new/?kind=0&region=1&section=7,5,3,4,1&rentprice=9000,13500&area=7,12', 0);