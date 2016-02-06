'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Book = new Schema({
  title: String,
  authors: [{
    type: String
  }],
  thumbnail: String,
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },    
  user_requests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    }]
});

module.exports = mongoose.model('Book', Book);
