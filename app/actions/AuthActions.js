var AppDispatcher = require('../dispatcher/AppDispatcher');
var BookConstants = require('../constants/BookConstants');

var AuthActions = {

    updateLogin: function(loginStatus) {
        console.log("updating login");
        AppDispatcher.dispatch({
                    actionType: BookConstants.UPDATE_LOGIN,
                    data: loginStatus
                });
    },

    
    login: function(loginData, done) {
         var apiUrl = "/login";
        $.ajax({
          url: apiUrl,
          dataType: 'json',
          type: 'POST',
          data: loginData,
          success: function(data) {
            this.updateLogin(true);
            done();
          }.bind(this),
          error: function(err) {
            this.updateLogin(false);
            done(err);
          }.bind(this)
        });
        
    },
    
    
    logout: function() {
         var apiUrl = "/logout";
        $.ajax({
          url: apiUrl,
          dataType: 'json',
          type: 'GET',
          success: function(data) {
              
              console.log("user logged out")
            this.updateLogin(false);
            
          }.bind(this),
          error: function(err) {
              console.log("error logging out")
          }.bind(this)
        });
        
    }
};

module.exports = AuthActions;
