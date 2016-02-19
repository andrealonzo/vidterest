/** @jsx React.DOM */
'use strict'
var React = require("react");

var Video = React.createClass({
    
    handleOnClick:function(){
        this.props.onRemoveClick({_id:this.props.video._id});
    },
    render: function() {

        var video = this.props.video;
        if(video.source == 'youtube'){
            return(
            <div key = {video._id} className="grid-item">
            <iframe src={"https://www.youtube.com/embed/" + video.videoId} frameBorder="0" allowFullScreen></iframe>
            <button className="btn btn-danger" onClick={this.handleOnClick}>Remove Video</button>
            </div>
            );
        }else if(video.source == 'vine'){
            return(
            <div key = {video._id}  className="grid-item">
                <iframe src={"https://vine.co/v/"+video.videoId+"/embed/simple?audio=1"} width="300" height="300" frameBorder="0"></iframe><script src="https://platform.vine.co/static/scripts/embed.js"></script>
            <button className="btn btn-danger" onClick={this.handleOnClick}>Remove Video</button>
            </div>
            );
        }else if(video.source == 'vimeo'){
            return(
            <div  key = {video._id} className="grid-item">
            <iframe src={"https://player.vimeo.com/video/"+video.videoId+"?title=0&byline=0&portrait=0"}  frameBorder="0" webkitallowfullscreen mozallowfullscreen allowFullScreen></iframe>
            <button className="btn btn-danger" onClick={this.handleOnClick}>Remove Video</button>
            </div>
            );
        }
    }
    

 
        
    


});

module.exports = Video;