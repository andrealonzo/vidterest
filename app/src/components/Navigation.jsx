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
            <nav className="navbar navbar-default zs-nav">
        <div className="container">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false" >
                    <span className="sr-only" >Toggle navigation</span>
                    <span className="icon-bar" ></span>
                    <span className="icon-bar" ></span>
                    <span className="icon-bar" ></span>
                </button><Link to={"/"} className="navbar-brand" id="AllBooks"><img src="/public/img/BCeater-right.png" className="pull-left" height="20px"></img><span className="zs-brand">ZOTSWAP</span> <span className="zs-subhead">online book exchange</span> </Link></div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        {this.state.loggedInUser?
        <ul className="nav navbar-nav navbar-right">
        <li ><Link to={"MyRequests"} ><div  className="zs-nav-button">My Requests</div></Link></li>
        <li ><Link to={"MyBooks"} ><div  className="zs-nav-button">My Books</div></Link></li>
        <li ><Link to={"AddBooks"} ><div  className="zs-nav-button">Add a Book</div></Link></li>
        <li className="dropdown">
          <a href="#" className="dropdown-toggle zs-profile-dropdown" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><img className="zs-profile-pic" src={this.state.loggedInUser?this.state.loggedInUser.imageUrl:null}/> </a>
          <ul className="dropdown-menu">
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
                      <div className="zs-nav-button" >Login</div></Link></li>
                    
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