/** @jsx React.DOM */
'use strict'
var React = require("react");
var Masonry = require('react-masonry-component');
var VideoStore = require('../../stores/VideoStore');
var AuthStore = require('../../stores/AuthStore');
var Video = require("./Video");

var masonryOptions = {
    itemSelector: '.grid-item',
    columnWidth: 300,
    fitWidth: true,
    gutter: 10
};

var UserVideos = React.createClass({
    setUserState: function() {
        AuthStore.getUser(this.props.params.userId,function(err, user) {
            if (err) return;
            this.setState({
                user: user
            });
        }.bind(this));
    },
    setVideosState: function() {
        VideoStore.getAllFromUser(this.props.params.userId,function(err, videos) {
            if (err) return;
            this.setState({
                videos: videos
            });
        }.bind(this));
    },
    getInitialState: function() {
        return {
            videos: [],
            user:{}
        };
    },
    componentDidMount: function() {
        this.setVideosState();
        this.setUserState();
        this.setVideoResizeListeners();
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
        <div>
        <h1>Videos from {this.state.user.displayName}</h1>
            <Masonry className="grid " options={masonryOptions} disableImagesLoaded={false}>
    <div className="grid-sizer"></div>
    
     {this.state.videos.map(function(video){
    
        if(
            video.source== 'youtube' || 
            video.source== 'vimeo' ||
            video.source == 'vine' ||
            video.source == 'instagram'){
            return(
            <Video key={video._id} video={video}>
            </Video>
            )
        } 
        
        
    }
    )}


 
</Masonry>
</div>

        )
    }


});

module.exports = UserVideos;