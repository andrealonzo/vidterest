var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var BookConstants = require('../constants/BookConstants');
var assign = require('object-assign');
var AjaxFunctions = require('../common/AjaxFunctions');


var CHANGE_EVENT = 'change';

var _books = [];

/**
 * Create a TODO item.
 * @param  {string} text The content of the TODO
 */
function load(books) {
  _books = books;
}


var ExternalSearchStore = assign({}, EventEmitter.prototype, {

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll: function(searchTerm, done) {
    if (!searchTerm) {
      return done([]);
    }
    var url = "/api/searchExternal/" + searchTerm;
    AjaxFunctions.get(url, function(err, books) {
      if (err) {
        console.log("error receiving books", err);
        done([]);
      }
      else {
        done(books);
      }

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
  var text;

  switch (action.actionType) {


    case BookConstants.SEARCH_EXTERNAL_RESULTS:
      var books = action.data;
      load(books);
      ExternalSearchStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = ExternalSearchStore;
