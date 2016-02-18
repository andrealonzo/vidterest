/** @jsx React.DOM */
'use strict'
var React = require("react");

var VideoActions = require('../../actions/VideoActions');


module.exports = React.createClass({

    handleOnClick:function(){
      VideoActions.addVideo({url:this.refs.urlToAdd.value}, function(err, addedVideo){
          console.log(addedVideo);
      });
    },
    render: function() {
        return (
            <div >
        <h1>Add Video</h1>
        <h4>Please add a url from Youtube or Vimeo</h4>
            <div className="form-group">
                <input type="text" ref="urlToAdd" className="form-control" placeholder="Video Url to Add"/>
                <button className="btn btn-default" onClick = {this.handleOnClick}>Add Video</button>
            </div>
    </div>
        )
    }
});