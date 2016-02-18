'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Video = new Schema({
  url: String,
  source: String,
  embedCode:String,
  videoId:String,
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },  
});

module.exports = mongoose.model('Video', Video);
