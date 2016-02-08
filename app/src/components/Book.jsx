/** @jsx React.DOM */
'use strict'
var React = require("react");


module.exports = React.createClass({

    handleOnClick:function(){
      this.props.onClick(this.props.book);  
    },    
    handleApproveRequest:function(){
      this.props.onApproveRequest(this.props.book);  
    },    
    handleDenyRequest:function(){
      this.props.onDenyRequest(this.props.book);  
    },
    render: function() {
        return(
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
           {this.props.clickText?
              <button className="btn btn-default" onClick={this.handleOnClick}>{this.props.clickText}</button>:null
           }
             {this.props.displayRequestActions && this.props.book.user_request?
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
            </div>
        </div>
        );
    }
});