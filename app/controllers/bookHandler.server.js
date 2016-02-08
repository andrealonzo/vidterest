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
        $set: {
          'user_request': {
            user: mongoose.Types.ObjectId(req.user._id),
            approved: false
          }
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
  
   this.approveRequest = function(req, res) {
    Book.findOne({
      '_id': mongoose.Types.ObjectId(req.body._id)
    }, function(err, book) {
      if (err) {
        console.log("An error occurred", err);
        return res.json({
          error: "An error occurred"
        });
      }
      book.user_request.approved = true;
      book.save(function(err, savedBook) {
        if (err) {
          console.log("An error occurred", err);
          return res.json({
            error: "An error occurred"
          });
        }
        
        return res.json(book);
      });
    });
   }

  this.getRequests = function(req, res) {
    if (!req.user) {
      console.log("An error occurred");
      return res.status(400).json({
        error: "An error occurred"
      });
    }
    var userId = mongoose.Types.ObjectId(req.user._id)
    Book.find({
        'user_request.user': userId
      }).populate('addedBy user_request.user')
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

  this.getBooksFromUser = function(req, res) {
    if (!req.user) {
      console.log("An error occurred");
      return res.status(400).json({
        error: "An error occurred"
      });
    }
    Book.find({
        addedBy: mongoose.Types.ObjectId(req.user._id)
      }).populate('addedBy user_request.user')
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



  this.removeRequest = function(req, res) {
    Book.findOne({
      '_id': mongoose.Types.ObjectId(req.body._id)
    }, function(err, book) {
      if (err) {
        console.log("An error occurred", err);
        return res.json({
          error: "An error occurred"
        });
      }
      book.user_request = undefined;
      book.save(function(err, savedBook) {
        if (err) {
          console.log("An error occurred", err);
          return res.json({
            error: "An error occurred"
          });
        }
        
        return res.json(book);
      });
    });
    // Book.find({
    //     '_id': mongoose.Types.ObjectId(req.body._id)
    //   }, {
    //     $unset: 'user_request'
    //   }, {
    //     'new': true
    //   })
    //   .exec(function(err, result) {
    //     if (err) {
    //       console.log("An error occurred", err);
    //       res.json({
    //         error: "An error occurred"
    //       });
    //     }
    //     res.json(result);
    //   });

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
      }).populate('addedBy user_request.user')
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
      .populate('addedBy user_request.user')
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

  this.getAvailable = function(req, res) {
    Book.find({user_request: { $exists: false } })
      .populate('addedBy user_request.user')
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


}
