'use strict';

var books = require('google-books-search');

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
        res.json({
          error: "An error occurred"
        });
      }
    });
  }


}
