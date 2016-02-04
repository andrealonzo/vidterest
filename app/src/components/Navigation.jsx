/** @jsx React.DOM */
'use strict'
var React = require("react");
module.exports = React.createClass({
        handlePageChange:function(e){
           e.preventDefault();
           this.props.onPageChange(e.target.innerText);
        },
		  render:function(){
		    return(
		       <nav className="navbar navbar-default zs-nav">
        <div className="container">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false" >
                    <span className="sr-only" >Toggle navigation</span>
                    <span className="icon-bar" ></span>
                    <span className="icon-bar" ></span>
                    <span className="icon-bar" ></span>
                </button><a href="#" className="navbar-brand" onClick={this.handlePageChange} id="AllBooks">ZOTSWAP <span className="zs-subhead">online book exchange</span> </a></div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

                <ul className="nav navbar-nav navbar-right">
                    <li ><a href="#" id="MyRequests" onClick={this.handlePageChange}><div  className="zs-nav-button" >My Requests</div></a></li>
                    <li ><a href="#" id="MyBooks" onClick={this.handlePageChange}><div  className="zs-nav-button" >My Books</div></a></li>
                    <li ><a href="#" id="MyBooks" onClick={this.handlePageChange}><div  className="zs-nav-button" >Add a Book</div></a></li>
                    <li ><a href="#" data-toggle="modal" data-target="#myModal"><div  className="zs-nav-button" >Login</div></a></li>
                </ul>
            </div>
        </div>
    </nav>
)
		  }
		});
		