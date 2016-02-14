/** @jsx React.DOM */
'use strict'
var React = require("react");

module.exports = React.createClass({

  handleOnClick: function() {
    this.props.onClick(this.props.book);
  },
  handleApproveRequest: function() {
    this.props.onApproveRequest(this.props.book);
  },
  handleDenyRequest: function() {
    this.props.onDenyRequest(this.props.book);
  },
  render: function() {
    return (
      <div>
      <button className="btn btn-default" onClick={this.handleOnClick}>Remove Book</button>
      {this.props.book.user_request?
            <div>
              <hr/>

                Requested By {this.props.book.user_request.user.displayName}
                
                {this.props.book.user_request.approved?
                <div>
                Approved!
                </div>
                :
                <div>
                <button className="btn btn-success" onClick={this.handleApproveRequest}><span className="glyphicon glyphicon-ok" aria-hidden="true"></span></button>
                <button className="btn btn-danger" onClick={this.handleDenyRequest}><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></button>
                </div>
                }
                </div>
                :null
                }
       </div>
    );
  }
});