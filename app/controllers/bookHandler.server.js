'use strict';

var books = require('google-books-search');
var Book = require('../models/books.js');
var mongoose = require('mongoose');

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


  this.request = function(req, res) {

    Book.findOneAndUpdate({
        '_id': mongoose.Types.ObjectId(req.body._id)
      }, {
        $addToSet: {
          'user_requests': mongoose.Types.ObjectId(req.user._id)
        }
      }, {
        'new': true,
        'upsert': true
      })
      .exec(function(err, result) {
        if (err) {
          console.log("An error occurred", err);
          res.json({
            error: "An error occurred"
          });
        }
        res.json(result);
      });

  }

  this.getRequests = function(req, res) {
    var userId = mongoose.Types.ObjectId(req.user._id)
    Book.find({
      user_requests: userId
    }, function(err, books) {
      if (err) {
        console.log("An error occurred", err);
        return res.status(400).json({
          error: "An error occurred"
        });
      }
      return res.json(books);

    });


  }



  this.removeRequest = function(req, res) {
    Book.findOneAndUpdate({
        '_id': mongoose.Types.ObjectId(req.body._id)
      }, {
        $pull: {
          'user_requests': mongoose.Types.ObjectId(req.user._id)
        }
      }, {
        'new': true
      })
      .exec(function(err, result) {
        if (err) {
          console.log("An error occurred", err);
          res.json({
            error: "An error occurred"
          });
        }
        res.json(result);
      });

  }

  this.add = function(req, res) {
    var newBook = new Book(req.body);
    newBook.addedBy = mongoose.Types.ObjectId(req.user._id);
    //get current user

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


  /**
   * 
   * Get all the books from the logged in user
   * 
   **/

  this.getBooksFromUser = function(req, res) {
    if (!req.user) {
      console.log("An error occurred");
      return res.status(400).json({
        error: "An error occurred"
      });
    }
    Book.find({
        addedBy: mongoose.Types.ObjectId(req.user._id)
      }).populate('addedBy user_requests')
      .exec(function(err, books) {
        if (err) {
          console.log("An error occurred", err);
          return res.status(400).json({
            error: "An error occurred"
          });
        }
        return res.json(books);

      });


  }

  this.getAll = function(req, res) {
    Book.find({})
      .populate('addedBy user_requests')
      .exec(function(err, books) {
        if (err) {
          console.log("An error occurred", err);
          return res.status(400).json({
            error: "An error occurred"
          });
        }
        return res.json(books);
      });
    // Book.find({}, function(err, books) {
    //   if (err) {
    //     console.log("An error occurred", err);
    //     return res.status(400).json({
    //       error: "An error occurred"
    //     });
    //   }
    //   return res.json(books);

    // });


  }


}
