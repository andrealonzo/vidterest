/** @jsx React.DOM */
'use strict'
var React = require("react");

module.exports = React.createClass({

  render: function() {
    return (
        <button className="btn btn-danger" onClick={this.onClick}>Remove Video</button>
    );
  }
});