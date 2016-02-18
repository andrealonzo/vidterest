var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var VideoConstants = require('../constants/VideoConstants');
var AjaxFunctions = require('../common/AjaxFunctions');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var VideoStore = assign({}, EventEmitter.prototype, {

  getAll: function(done) {
    var url = "/api/video/";
    AjaxFunctions.get(url, function(err, data) {
      done(err, data);
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

    case VideoConstants.VIDEOS_UPDATE:
      VideoStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = VideoStore;
