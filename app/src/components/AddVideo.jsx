/** @jsx React.DOM */
'use strict'
var React = require("react");


module.exports = React.createClass({

    handleOnClick:function(){
      console.log(this.refs.urlToAdd.value);
    },
    render: function() {
        return (
            <div >
        <h1>Add Video</h1>
        <h4>Please add a url from Youtube, Vimeo, Instagram, or Vine</h4>
            <div className="form-group">
                <input type="text" ref="urlToAdd" className="form-control" placeholder="Video Url to Add"/>
                <button className="btn btn-default" onClick = {this.handleOnClick}>Add Video</button>
            </div>
    </div>
        )
    }
});