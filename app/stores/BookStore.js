var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var BookConstants = require('../constants/BookConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';



var BookStore = assign({}, EventEmitter.prototype, {

  getAll: function(done) {
    var url = "/api/books/";
    $.ajax({
      type: "GET",
      url: url,
      contentType: "application/json",
      success: function(data) {
        done(data);
      },
      error: function(data) {
        console.log("error receiving data", data);
        done([]);
      },
      dataType: 'json'
    });

  },

  getAllFromUser: function(done) {
    var url = "/api/user/books/";
    $.ajax({
      type: "GET",
      url: url,
      contentType: "application/json",
      success: function(data) {
        done(data);
      },
      error: function(data) {
        console.log("error receiving data", data);
        done([]);
      },
      dataType: 'json'
    });
  },
  

  getUserRequests: function(done) {
    
        console.log('geting User Requests');
    var url = "/api/books/request/";
    $.ajax({
      type: "GET",
      url: url,
      contentType: "application/json",
      success: function(data) {
        console.log('got user requests');
        done(data);
      },
      error: function(data) {
        console.log("error receiving data", data);
        done([]);
      },
      dataType: 'json'
    });
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  switch (action.actionType) {

    case BookConstants.BOOKS_UPDATE:
      BookStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = BookStore;
