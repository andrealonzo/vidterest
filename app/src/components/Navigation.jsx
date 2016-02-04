/** @jsx React.DOM */
'use strict'
var React = require("react");
var Link = require('react-router').Link;
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
                </button><Link to={"/"} className="navbar-brand" id="AllBooks">ZOTSWAP <span className="zs-subhead">online book exchange</span> </Link></div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

                <ul className="nav navbar-nav navbar-right">
                    <li ><Link to={"MyRequests"}><div  className="zs-nav-button" >My Requests</div></Link></li>
                    <li ><Link to={"MyBooks"}><div  className="zs-nav-button" >My Books</div></Link></li>
                    <li ><Link to={"AddBooks"}><div  className="zs-nav-button" >Add a Book</div></Link></li>
                    <li ><a href="#" data-toggle="modal" data-target="#myModal"><div  className="zs-nav-button" >Login</div></a></li>
                </ul>
            </div>
        </div>
    </nav>
)
		  }
		});
		