'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Video = new Schema({
  url: String,
  source: String,
  embedCode:String
});

module.exports = mongoose.model('Video', Video);
