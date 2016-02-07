/** @jsx React.DOM */
'use strict'
var React = require("react");


module.exports = React.createClass({

    handleOnClick:function(){
      this.props.onClick(this.props.book);  
    },
    render: function() {
        return(
        <div key = {this.props.book.id} className="col-sm-3">
            <div className="panel panel-default">
              <div className="panel-body">
                  
            <img className="img-responsive" src={this.props.book.thumbnail}>
            </img>
            <div><a href="#">{this.props.book.title}</a></div>
            
            {this.props.book.authors?this.props.book.authors.map(function(author){
                return(
                <div>
                {author}
                </div>);
            }):null}
            {this.props.book.user_request?
                <div>
                Requested By {this.props.book.user_request.user.displayName}
                </div>:null
            }
              <button className="btn btn-default" onClick={this.handleOnClick}>{this.props.clickText}</button>
              </div>
            </div>
        </div>
        );
    }
});