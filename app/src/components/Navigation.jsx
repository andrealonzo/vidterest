/** @jsx React.DOM */
'use strict'
var React = require("react");
var Link = require('react-router').Link;
var AuthStore = require('../../stores/AuthStore');

var AuthActions = require('../../actions/AuthActions');

function getLoggedInUser(done) {
    AuthStore.getLoggedInUser(function(err, user) {
        if (err) {
            //user not logged in
            console.log("user not logged in");
            done(null);
        }
        else {
            console.log("user successfully retrieved", user);
            done(user);
        }
    });
}

module.exports = React.createClass({
    getInitialState: function() {
        return {
            loggedInUser: null
        };
    },
    componentDidMount: function() {
        getLoggedInUser(function(user) {

            this.setState({
                loggedInUser: user
            });
        }.bind(this));
        AuthStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        AuthStore.removeChangeListener(this._onChange);
    },
    handleLogoutClick: function(e) {
        e.preventDefault();
        AuthActions.logout();
    },
    render: function() {
        return (
            <nav className="navbar navbar-default">
        <div className="container">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false" >
                    <span className="sr-only" >Toggle navigation</span>
                    <span className="icon-bar" ></span>
                    <span className="icon-bar" ></span>
                    <span className="icon-bar" ></span>
                </button><Link to={"/"} className="navbar-brand" id="AllBooks"><span className="title">Vidterest</span></Link></div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        {this.state.loggedInUser?
        <ul className="nav navbar-nav navbar-right">
        <li ><Link to={"MyVideos"} >My Videos</Link></li>
        <li className="dropdown">
        {
        this.state.loggedInUser.imageUrl?
          <a href="#" className="dropdown-toggle " data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><img  src={this.state.loggedInUser.imageUrl}/> </a>
         
            :
        <a href="#" className="dropdown-toggle " data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><div>Welcome {this.state.loggedInUser.displayName}</div></a>
         
        }
          <ul className="dropdown-menu">
            <li><Link to={"EditProfile"} >Edit Profile</Link></li>
            <li><a href="#" onClick={this.handleLogoutClick}>
            Logout
          </a></li>
          </ul>
        </li>
      </ul>
      :
         <ul className="nav navbar-nav navbar-right">
         <li ><Link to={{
                        pathname: "Login",
                        state: { modal: true }
                      }}>
                      <div  >Login</div></Link></li>
                    
        </ul>   
            
        }
               
            </div>
        </div>
    </nav>
        )
    },
    /**
     * Event handler for 'change' events coming from the LoginStore
     */
    _onChange: function() {
        getLoggedInUser(function(user) {
            this.setState({
                loggedInUser: user
            });
        }.bind(this));
    }
});