/** @jsx React.DOM */
'use strict'
var React = require("react");


module.exports = React.createClass({
  getInitialState: function() {
    return {
      added: false
    }
  },
  render: function() {
    return (
      <div key = {this.props.book.id} className="col-sm-3">
            <div className="panel panel-default">
              <div className="panel-body">
                  
            <img className="img-responsive" src={this.props.book.thumbnail}>
            </img>
            {this.props.book.addedBy?
            <div>Added by {this.props.book.addedBy.displayName}</div>:null
            }
            
            <div><a href="#">{this.props.book.title}</a></div>
            
            {this.props.book.authors?this.props.book.authors.map(function(author){
                return(
                <div>
                {author}
                </div>);
            }):null}
            {
              React.Children.map(this.props.children, function(child) {
                    return React.cloneElement(child, { book: this.props.book });
                }.bind(this))
            }
           
             
              </div>
            </div>
        </div>
             
    );
  }
});