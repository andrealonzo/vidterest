/** @jsx React.DOM */
'use strict'
var React = require("react");
var Masonry = require('react-masonry-component');
var VideoStore = require('../../stores/VideoStore');
var VideoActions = require('../../actions/VideoActions');
var Video = require('./Video');
var RemoveVideoButton = require('./RemoveVideoButton');




var masonryOptions = {
    itemSelector: '.grid-item',
    columnWidth: 300,
    fitWidth: true,
    gutter: 10
};

var MyVideos = React.createClass({

    setVideosState: function() {
        VideoStore.getAllFromUser(null, function(err, videos) {
            if (err) return;
            this.setState({
                videos: videos
            });
        }.bind(this));
    },
    getInitialState: function() {
        return {
            videos: []
        };
    },
    componentDidMount: function() {
        
        this.setVideosState();
        this.setVideoResizeListeners();
        VideoStore.addChangeListener(this._onChange);
        
    },
    componentWillUnmount: function() {
        VideoStore.removeChangeListener(this._onChange);
    },
    handleRemoveClick: function(videoId) {
        console.log(videoId);
        this.setState({
            message: null
        });
        VideoActions.remove(videoId, function(err, video) {
            if (err) {
                this.setState({
                    message: {
                        type: 'danger',
                        text: 'There was an error trying to remove video'
                    }
                });
            }
            else {
                this.setState({
                    message: {
                        type: 'success',
                        text: 'Video was successfully removed'
                    }
                });

            }
        }.bind(this));
    },
    handleOnClick: function() {
        this.setState({
            message: null
        });
        VideoActions.add({
            url: this.refs.urlToAdd.value
        }, function(err, addedVideo) {
            if (err) {
                this.setState({
                    message: {
                        type: 'danger',
                        text: 'There was an error trying to add video'
                    }
                });
            }
            else {
                this.setState({
                    message: {
                        type: 'success',
                        text: 'Video was successfully added'
                    }
                });

            }
        }.bind(this));
        this.refs.urlToAdd.value = "";
    },
    setVideoResizeListeners: function() {
        
        // Find all YouTube videos
        var $allVideos = $("iframe[src^='https://vine.co'], iframe[src^='https://player.vimeo.com'], iframe[src^='https://www.youtube.com']");
        // The element that is fluid width
        var $fluidEl = $(".grid-item");

        // Figure out and save aspect ratio for each video
        $allVideos.each(function() {
            $(this)
                .data('aspectRatio', this.height / this.width)
                // and remove the hard coded width/height
                .removeAttr('height')
                .removeAttr('width')
                .addClass('video-item');


        });
        // When the window is resized
        $(window).resize(function() {
            
            var newWidth = $fluidEl.width();
            // Resize all videos according to their own aspect ratio
            $allVideos.each(function() {
                var $el = $(this);
                $el
                    .width(newWidth)
                    .height(newWidth * $el.data('aspectRatio'));

            });

            // Kick off one resize to fix all videos on page load
        }).resize();
    },
    render: function() {
        return (
            <div >
        <h1>Add Video</h1>
        <h4>Please add a url from Youtube or Vimeo</h4>
            <div className="form-group">
                <input type="text" ref="urlToAdd" className="form-control" placeholder="Video Url to Add"/>
                {this.state.message?
                    <div className={"alert alert-" + this.state.message.type} role="alert">{this.state.message.text}</div>
                    :null
                }
                <button className="btn btn-default" onClick = {this.handleOnClick}>Add Video</button>
            </div>
            <Masonry className="grid " options={masonryOptions} disableImagesLoaded={false}>
    <div className="grid-sizer"></div>
    
    {this.state.videos.map(function(video){
        if(
            video.source== 'youtube' || 
            video.source== 'vimeo' ||
            video.source == 'vine' ||
            video.source == 'instagram'){
            return(
            <Video key={video._id} video={video} onRemoveClick={this.handleRemoveClick}>
                <button className="btn btn-danger" onClick={this.onClick}>Remove Video</button>
            </Video>
            )
        }
    }.bind(this)
    )}
    

 
</Masonry>

    </div>
        )
    },
    /**
     * Event handler for 'change' events coming from the BookStore
     */
    _onChange: function() {
        this.setVideosState();
    }

});

module.exports = MyVideos;