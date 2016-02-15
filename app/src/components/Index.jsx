/** @jsx React.DOM */
'use strict'
var ReactDOM = require('react-dom')
var React = require("react");
var Navigation = require('./Navigation')
var MyBooks = require('./MyBooks')
var AllBooks = require('./AllBooks')
var AddBooks = require('./AddBooks')
var MyRequests = require('./MyRequests')
var EditProfile = require('./EditProfile')
var Login = require('./Login')
var AuthStore = require('../../stores/AuthStore');
require("../css/main.scss");
var assign = require('object-assign');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var browserHistory = require('react-router').browserHistory;


var App = React.createClass({

    getInitialState: function() {
      return{
          user:null
      }  
    },
    handleLogin: function() {
        location.reload();
    },
    componentDidMount: function() {
        this.setAuthState();
        AuthStore.addChangeListener(this._onChange);
        
    },
    componentWillUnmount: function() {
        AuthStore.removeChangeListener(this._onChange);
    },
    componentWillReceiveProps: function(nextProps) {
        this.previousChildren = this.props.children
        
    },
    setAuthState: function() {
        AuthStore.getLoggedInUser(function(err, user){
            if(err){
                //user not logged in
                console.log("user not logged in");
                this.setState({
                    user: null
                })
            }else{
                console.log("user successfully retrieved", user);
                this.setState({
                    user: user
                });
            }
        }.bind(this));
    },
     _onChange: function() {
        this.setAuthState();
    },
    render: function() {
        return (
            <div>
                <Navigation user={this.state.user} onPageChange={ this.handlePageChange}/>
                <div className="container text-center">
                    <p></p>
                    {this.props.location.state && this.props.location.state.modal?
                        this.previousChildren:null}
                        
                        
                    {
                        //add the user property to each of the children
                        React.Children.map(this.props.children, function(child) {
                            return React.cloneElement(child, { user: this.state.user });
                        }.bind(this))
                        
                    }
                   
                </div>
            </div>
        )
    }
});


ReactDOM.render((
    <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="AddBooks" component={AddBooks}/>
      <Route path="MyBooks" component={MyBooks}/>
      <Route path="MyRequests" component={MyRequests}/>
      <Route path="Login" component={Login}/>
      <Route path="EditProfile" component={EditProfile}/>
      <IndexRoute component={AllBooks}/>
    </Route>
  </Router>
), document.getElementById('app'));
