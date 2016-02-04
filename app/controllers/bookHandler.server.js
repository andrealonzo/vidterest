'use strict';

var books = require('google-books-search');
var Book = require('../models/books.js');

module.exports = function() {

  this.handleError = function(err, res) {
    console.log("An error occurred", err);
    res.json({
      error: "An error occurred"
    });
  };

  this.searchExternal = function(req, res) {
    books.search(req.params.searchTerm, function(error, results) {
      if (!error) {
        res.json(results);
      }
      else {
        console.log("An error occurred", error);
        res.status(400).json({
          error: "An error occurred"
        });
      }
    });
  }

  this.add = function(req, res) {
    var newBook = new Book(req.body);

    newBook.save(function(err) {
      if (err) {
        console.log(err);
        return res.status(400).json({
          msg: 'There was an error saving book'
        });
      }
      return res.json(newBook);
    });
  }

  this.remove = function(req, res) {
    var bookId = req.body._id;

    Book.find({
      _id: bookId
    }).remove(function(err) {
      if (err) {
        console.log(err);
        return res.status(400).json({
          msg: 'There was an error removing book'
        });
      }
      return res.json(req.body);
    });
  }
  this.getAll = function(req, res) {

    Book.find({}, function(err, books) {
      if (err) {
        console.log("An error occurred", err);
        return res.status(400).json({
          error: "An error occurred"
        });
      }
      return res.json(books);

    });


  }


}
