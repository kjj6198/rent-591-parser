var cheerio = require('cheerio');

const onlyFemale = ($) => {
  return $('.two em[title="女生"]').length === 1;
}

const getPrice = ($) => {
  return $('.price i').text();
}

const getPhotos = ($) => {
  return $('#hid_imgArr').val();
}

const getHouseTitle = ($) => {
  return $('h1 span.houseInfoTitle').text();
}

const getLandlordInfo = ($) => {
  const text = $('.userInfo .infoTwo').html().match(/<!--.*?-->/g)[0]
    .match(/\d+/g).join('');
  return $('.userInfo .avatarRight div').text() + '手機：' + text; 
}

const getHouseDetail = ($) => {
  const result = [];
  $('.detailInfo .attr > li').each((i, elm) => {
    result.push($(elm).text());
  });
  return result;
}

const getDetails = ($) => {
  const results = [];
  $('.detailBox .labelList > li').each((i, elm) => {
    results.push($(elm).find('.one').text() + $(elm).find('.two').text());
  });

  $('.facility > li').each((i, elm) => {
    results.push($(elm).text());
  });
  return results;
}

const getHouseIntro = ($) => {
  return $('.houseIntro').text();
}

function HouseParser(body, url = null) {
  this.$ = cheerio.load(body);
  this.url = url;
}


HouseParser.prototype.getAllInfo = function() {
  return {
    onlyFemale: onlyFemale(this.$),
    price: getPrice(this.$),
    photos: getPhotos(this.$),
    houseTitle: getHouseTitle(this.$),
    landlordInfo: getLandlordInfo(this.$),
    details: getDetails(this.$),
    houseIntro: getHouseIntro(this.$),
    houseDetail: getHouseDetail(this.$),
    url: this.url,
  };
};

module.exports = HouseParser;