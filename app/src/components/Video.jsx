/** @jsx React.DOM */
'use strict'
var React = require("react");

var Video = React.createClass({
    
    componentDidMount:function(){
        //load instagram videos
        window.instgrm.Embeds.process(); 
    },
    handleOnClick:function(){
        this.props.onRemoveClick({_id:this.props.video._id});
    },
    render: function() {

        var video = this.props.video;
        if(video.source == 'youtube'){
            return(
            <div key = {video._id} className="grid-item">
            <iframe src={"https://www.youtube.com/embed/" + video.videoId} frameBorder="0" allowFullScreen></iframe>
            {this.props.children}
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
        }else if(video.source == 'instagram'){
            return(
             <div key = {video._id} className="grid-item">
                <blockquote className="instagram-media"  data-instgrm-version="6">
                    <div className = "ig-wrapper" >
                        <div className = 'ig-image-wrapper'>
                            <div className = 'ig-image' style = {{ background: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAAGFBMVEUiIiI9PT0eHh4gIB4hIBkcHBwcHBwcHBydr+JQAAAACHRSTlMABA4YHyQsM5jtaMwAAADfSURBVDjL7ZVBEgMhCAQBAf//42xcNbpAqakcM0ftUmFAAIBE81IqBJdS3lS6zs3bIpB9WED3YYXFPmHRfT8sgyrCP1x8uEUxLMzNWElFOYCV6mHWWwMzdPEKHlhLw7NWJqkHc4uIZphavDzA2JPzUDsBZziNae2S6owH8xPmX8G7zzgKEOPUoYHvGz1TBCxMkd3kwNVbU0gKHkx+iZILf77IofhrY1nYFnB/lQPb79drWOyJVa/DAvg9B/rLB4cC+Nqgdz/TvBbBnr6GBReqn/nRmDgaQEej7WhonozjF+Y2I/fZou/qAAAAAElFTkSuQmCC)'}}></div>
                        </div>
                        <p className = 'ig-link-wrapper'> <a className='ig-link' href={"https://www.instagram.com/p/"+video.videoId+"/"} target="_blank">&nbsp;</a></p>
                        <p className='ig-meta' >&nbsp;
                        </p>
                    </div>
                </blockquote>
            </div>
            );
        }
    }
    

 
        
    


});

module.exports = Video;