/** @jsx React.DOM */
'use strict'
var React = require("react");


module.exports = React.createClass({
  handleOnClick: function() {
    this.props.onClick(this.props.book);
  },
  render: function() {
    return (
      this.props.book.user_request && this.props.book.user_request.approved?
      <div>Swap Approved</div>:
      this.props.book.user_request ?
      <div>Requested By {this.props.book.user_request.user.displayName}</div> :
      <button className="btn btn-default" onClick={this.handleOnClick}>Request Book</button>
    );
  }
});