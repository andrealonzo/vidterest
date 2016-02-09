var AppDispatcher = require('../dispatcher/AppDispatcher');
var BookConstants = require('../constants/BookConstants');
var AjaxFunctions = require('../common/AjaxFunctions');

var AuthActions = {

  updateLogin: function(loginStatus) {
    AppDispatcher.dispatch({
      actionType: BookConstants.UPDATE_LOGIN,
      data: loginStatus
    });
  },

  signup: function(signupData, done) {

    var apiUrl = "/signup";
    AjaxFunctions.post(apiUrl, signupData, done);
  },


  login: function(loginData, done) {

    var apiUrl = "/login";
    AjaxFunctions.post(apiUrl, loginData, function(err, data){
      if(!err){
        this.updateLogin(true);
      }
      done(err, data);
    }.bind(this));

  },


  logout: function() {
    var apiUrl = "/logout";

    AjaxFunctions.get(apiUrl, function(err) {
      if (err) {
        console.log("error logging out", err);
      }
      else {

        console.log("user logged out")
        this.updateLogin(false);
      }
    }.bind(this));


  }
};

module.exports = AuthActions;
