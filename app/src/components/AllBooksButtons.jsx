/** @jsx React.DOM */
'use strict'
var React = require("react");
var Link = require('react-router').Link;

module.exports = React.createClass({

  handleOnClick: function() {
    this.props.onClick(this.props.book);
  },
  render: function() {
    return (
      //check if user is logged in
      !this.props.user?
      <Link className="btn btn-default" to={{pathname: "Login", state: { modal: true }}}>Login</Link>:
      //check if book has an approved request
      this.props.book.user_request && this.props.book.user_request.approved ?
      <div>Swap Approved</div> :
      //check if book has an unapproved request
      this.props.book.user_request ?
      <div>Requested By {this.props.book.user_request.user.displayName}</div> :
      //if none of the above, book can be requested
      <button className="btn btn-default" onClick={this.handleOnClick}>Request Book</button>
    );
  }
});