var mongoose = require('mongoose');
var schema = mongoose.Schema({
  femaleOnly: Boolean,
  title: String,
  landlordInfo: String,
  details: [String],
  houseIntro: String,
  houseDetail: [String],
  price: String,
  photos: String,
  url: String,
  createdAt: Date
});

schema.methods.getAllInfo = function() {
  return {
    femaleOnly: this.femaleOnly,
    title: this.title,
    landlordInfo: this.landlordInfo,
    details: this.details,
    houseIntro: this.houseIntro,
    houseDetail: this.houseDetail,

  };
};

module.exports = mongoose.model('House', schema);