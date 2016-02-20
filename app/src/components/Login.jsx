/** @jsx React.DOM */
'use strict'
var React = require("react");
var ExternalLoginOptions = require("./ExternalLoginOptions");
var Signup = require("./Signup");
var LocalLogin = require("./LocalLogin");
var AuthActions = require('../../actions/AuthActions');



module.exports = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  handleDisplayErrors: function() {
    this.setState({
      errors: []
    })
  },

  handleSignupSubmit: function(signupData) {
    AuthActions.signup(signupData, function(err) {
      if (err) {
        this.setState({
          message: {
            msg: err.responseJSON.msg,
            type: "error"
          }
        });
        return;
      }
      else {
        this.setState({
          showPage: "LocalLogin",
          message: {
            msg: "Registration successful! Please log in.",
            type: "success"
          }
        });
      }
    }.bind(this));

  },
  handleLoginSubmit: function(loginData) {
    AuthActions.login(loginData, function(err) {
      if (err) {
        this.setState({
          message: {
            msg: err.responseJSON.msg,
            type: "error"
          }
        });
      }
      else {
        if (location.state && location.state.nextPathname) {
          this.context.router.replace(location.state.nextPathname)
        }
        else {
          this.context.router.replace('/')
        }
      }
    }.bind(this));
  },
  handleBackClickOnLocalLogin: function() {
    this.setState({
      showPage: "ExternalLoginOptions",
      message: {}
    });
  },
  handleBackClickOnSignup: function() {
    this.setState({
      showPage: "ExternalLoginOptions",
      message: {}
    });
  },
  handleLoginClick: function() {
    this.setState({
      showPage: "LocalLogin",
      message: {}
    });
  },
  handleSignupClick: function() {
    this.setState({
      showPage: "Signup",
      message: {}
    });
  },
  componentDidMount: function() {
    $('#myModal').modal('show');
  },
  componentWillUnmount: function() {
    $('#myModal').modal('hide');
  },
  getInitialState: function() {
    return ({
      showPage: "ExternalLoginOptions",
      message: {}
    });
  },
  render: function() {
    return (
      
      <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div className="modal-dialog modal-sm" role="document">
        {this.state.showPage==='LocalLogin'?
          <LocalLogin 
            onBackClick = {this.handleBackClickOnLocalLogin}
            onSubmit = {this.handleLoginSubmit}
            message = {this.state.message}
            >
          </LocalLogin>:
          this.state.showPage==="Signup"?
          <Signup 
            onBackClick = {this.handleBackClickOnSignup} 
            onSubmit = {this.handleSignupSubmit}
            message = {this.state.message}
            >
          </Signup>:
          <ExternalLoginOptions 
            onSignupClick = {this.handleSignupClick} 
            onLoginClick={this.handleLoginClick}>
          </ExternalLoginOptions>
          
        }
        
  </div>
</div>

    )
  }
});