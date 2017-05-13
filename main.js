var cheerio = require('cheerio');
var request = require('request');
var HouseParser = require('./parser.js');
var pg = require('pg');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = function searchHouse(url, currentPage) {
  request(url, async(err, res, body) => {
    var $ = cheerio.load(body);
    var totalNum = $('.pageNum-form').data('total');

    var allPages = +totalNum / 30;

    await sleep(10000);

    if (currentPage < allPages) {
      await sleep(4000);
      $('#content > .listInfo').each(async(i, elm) => {
        const url = 'https:' + $(elm).find('a').attr('href').trim();
        await sleep(4000);
        request(url, async(err, res, houseBody) => {
          var houseParser = new HouseParser(houseBody, url);
          console.log(houseParser.getAllInfo());
          await sleep(4000);
        });
        await sleep(4000);
      });
      searchHouse(url + '&firstRow=' + currentPage * 30 + '&totalRow=' + totalNum, ++currentPage);
    }
  })
}

// [TODO] add search result to database.