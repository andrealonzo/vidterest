var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var BookConstants = require('../constants/BookConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _isLoggedIn = false;
function updateLogin(loginStatus){
    _isLoggedIn = loginStatus;
}
var AuthStore = assign({}, EventEmitter.prototype, {

  getLoginStatus: function() {
    console.log("getting loginStatus", _isLoggedIn);
    return _isLoggedIn;
  },
  getUser: function(userId, done) {
    var userApiUrl = "/api/user/"+userId;
        $.ajax({
            type: "GET",
            url: userApiUrl,
            contentType: "application/json",
            success: function(data) {
                done(null, data);
            }.bind(this),
            error: function(err) {
                done(err, null);
            }.bind(this),
            dataType: 'json'
        });
  },
  getLoggedInUser: function(done) {
    var userApiUrl = "/api/user";
        $.ajax({
            type: "GET",
            url: userApiUrl,
            contentType: "application/json",
            success: function(data) {
                done(null, data);
            }.bind(this),
            error: function(err) {
                done(err, null);
            }.bind(this),
            dataType: 'json'
        });
  },
  emitChange: function() {
    console.log("emitting change");
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

  switch(action.actionType) {
    
    
    case BookConstants.UPDATE_LOGIN:
      var loginStatus = action.data;
      console.log(action);
      updateLogin(loginStatus);
      console.log("updated login.  going to emit the change");
      AuthStore.emitChange();
      break;
      
    default:
      // no op
  }
});

module.exports = AuthStore;
