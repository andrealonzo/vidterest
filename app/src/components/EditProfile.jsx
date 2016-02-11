/** @jsx React.DOM */
'use strict'
var React = require("react");
var AuthStore = require('../../stores/AuthStore');
var AuthActions = require('../../actions/AuthActions');
var assign = require('object-assign');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      user: {},
      alert: {}
    }
  },
  componentDidMount: function() {
    AuthStore.getLoggedInUser(function(err, user) {
      if (!err) {
        this.setState({
          user: user
        });
      }
    }.bind(this));
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var updatedUser = assign({}, this.state.user);
    AuthActions.updateUser(updatedUser, function(err) {
      if (err) {
        this.setState({
          alert: {
            type: "danger",
            msg: "There was an error updating profile"
          }
        });
      }
      else {
        this.setState({
          alert: {
            type: "success",
            msg: "Profile was successfully updated"
          }
        });
      }
    }.bind(this));
  },
  handleDisplayNameChange:function(e){
    var user = assign({},this.state.user, {displayName: e.target.value});
    this.setState({user:user});
  },
  handleImageUrlChange:function(e){
    var user = assign({},this.state.user, {imageUrl: e.target.value});
    this.setState({user:user});
  },
  handleCityChange:function(e){
    var user = assign({},this.state.user, {city:e.target.value});
    this.setState({user:user});
  },
  handleStateChange:function(e){
    var user = assign({},this.state.user, {state:e.target.value});
    this.setState({user:user});
  },
  render: function() {
    return (
      <div>
      <h1>Edit Profile</h1>
      {this.state.alert?
        
      <div className={"alert alert-" + this.state.alert.type} role="alert">{this.state.alert.msg}</div>:null
        
      }
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Display Name</label>
          <input  type="text" className="form-control" id="exampleInputEmail1" placeholder="Display Name" value={this.state.user.displayName} onChange={this.handleDisplayNameChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Profile Image Url</label>
          <input  type="text" className="form-control" id="exampleInputEmail1" placeholder="Image Url" value={this.state.user.imageUrl} onChange={this.handleImageUrlChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">City</label>
          <input type="text" className="form-control" id="exampleInputEmail1" placeholder="City" value={this.state.user.city} onChange={this.handleCityChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">State</label>
          <input type="text" className="form-control" id="exampleInputPassword1" placeholder="State" value={this.state.user.state} onChange={this.handleStateChange}/>
        </div>
       
        <button type="submit" className="btn btn-default">Submit</button>
      </form>
    </div>


    );
  }
});