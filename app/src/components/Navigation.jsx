/** @jsx React.DOM */
'use strict'
var React = require("react");
module.exports = React.createClass({
   
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
                </button><div className="navbar-brand" >ZOTSWAP <span className="zs-subhead">online book exchange</span> </div></div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

                <ul className="nav navbar-nav navbar-right">
                    <li ><a href="#" data-toggle="modal" data-target="#myModal"><div  className="zs-nav-button" >Login</div></a></li>
                </ul>
            </div>
        </div>
    </nav>
)
		  }
		});
		