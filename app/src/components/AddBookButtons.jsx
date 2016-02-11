/** @jsx React.DOM */
'use strict'
var React = require("react");


module.exports = React.createClass({
  getInitialState: function() {
    return {
      added: false
    }
  },
  handleOnClick: function() {
    this.props.onClick(this.props.book, function(err) {
      if (!err) {
        this.setState({
          added: true
        });
      }
    }.bind(this));
  },
  render: function() {
    return (
      this.state.added ?
        <div className="alert alert-success" role="alert">Added!</div> :
        <button className="btn btn-default" onClick={this.handleOnClick}>Add Book</button>
    );
  }
});