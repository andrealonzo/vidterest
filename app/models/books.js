'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Book = new Schema({
  google_books_id: String,
  title: String,
  authors: [{
    type: String
  }],
  thumbnail: String,
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },    
  user_request: {
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    },
    approved:Boolean
  }
});

module.exports = mongoose.model('Book', Book);
