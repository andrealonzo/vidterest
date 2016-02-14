/** @jsx React.DOM */
'use strict'
var React = require("react");

module.exports = React.createClass({

  handleOnClick: function() {
    this.props.onClick(this.props.book);
  },
  render: function() {
    return (
      <button className="btn btn-default" onClick={this.handleOnClick}>Remove Request</button>
    );
  }
});