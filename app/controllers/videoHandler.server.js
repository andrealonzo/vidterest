'use strict';
var Video = require('../models/videos.js');
var Url = require('url');
var mongoose = require('mongoose');


module.exports = function() {

  this.getAllFromUser = function(req, res) {
    if (!req.user) {
      return res.json({});
    }
    Video.find({
        addedBy: mongoose.Types.ObjectId(req.user._id)
      }).sort({
        _id: -1
      })
      .exec(function(err, videos) {
        if (err) {
          console.log("An error occurred", err);
          return res.status(400).json({
            error: "An error occurred"
          });
        }
        return res.json(videos);
      });
  }

  this.getAll = function(req, res) {
    Video.find({}).sort({
        _id: -1
      })
      .exec(function(err, videos) {
        if (err) {
          console.log("An error occurred", err);
          return res.status(400).json({
            error: "An error occurred"
          });
        }
        return res.json(videos);
      });
  }

  this.remove = function(req, res) {
    if (!req.body) {
      return res.status(400).json({
        msg: 'There was an error removing book'
      });
    }

    var id = req.body._id;

    Video.find({
      _id: id
    }).remove(function(err) {
      if (err) {
        console.log(err);
        return res.status(400).json({
          msg: 'There was an error removing book'
        });
      }
      return res.json(req.body);
    });

  }

  this.add = function(req, res) {
    var url = req.body.url;

    var parsedVideo = parseVideo(url);
    var video = new Video(parsedVideo);
    if (req.user) {
      video.addedBy = mongoose.Types.ObjectId(req.user._id);
    }
    video.save();
    return res.json(video);

  }

  var parseVideo = function(url) {
    if (!url) return null;
    var video = new Video();

    video.url = url;

    //get source
    var re = /youtube/;
    var parsedUrl = Url.parse(url);
    var source = parsedUrl.hostname;
    source = source.replace(/www\./, '');
    source = source.replace(/\..*/, '');
    video.source = source;

    if (source == 'youtube') {
      //get videoid
      var urlSplit = url.split('=');

      var videoId = urlSplit[urlSplit.length - 1];

      video.videoId = videoId;
      video.embedCode = "<iframe src='https://www.youtube.com/embed/" + videoId + "' frameborder='0' allowfullscreen></iframe>";
    }
    else if (source == 'vimeo') {
      var urlSplit = url.split('/');
      var videoId = urlSplit[urlSplit.length - 1];
      video.videoId = videoId;
      video.embedCode = '<iframe src="https://player.vimeo.com/video/' + videoId + '?byline=0&portrait=0" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
    }
    else if (source == 'vine') {
      var urlSplit = url.split('/');
      var videoId = urlSplit[urlSplit.length - 1];
      video.videoId = videoId;
      video.embedCode = '<iframe src="https://vine.co/v/' + videoId + '/embed/simple" width="600" height="600" frameborder="0"></iframe>'

    }
    else if (source == 'instagram') {
      parsedUrl.pathname;
      var videoId = parsedUrl.pathname;
      videoId = videoId.replace(/\/p\//, '');
      videoId = videoId.replace(/\//, '');
      video.videoId = videoId;
      video.embedCode = '<blockquote class="instagram-media" data-instgrm-version="6" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:658px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:8px;"> <div style=" background:#F8F8F8; line-height:0; margin-top:40px; padding:50.0% 0; text-align:center; width:100%;"> <div style=" background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAAGFBMVEUiIiI9PT0eHh4gIB4hIBkcHBwcHBwcHBydr+JQAAAACHRSTlMABA4YHyQsM5jtaMwAAADfSURBVDjL7ZVBEgMhCAQBAf//42xcNbpAqakcM0ftUmFAAIBE81IqBJdS3lS6zs3bIpB9WED3YYXFPmHRfT8sgyrCP1x8uEUxLMzNWElFOYCV6mHWWwMzdPEKHlhLw7NWJqkHc4uIZphavDzA2JPzUDsBZziNae2S6owH8xPmX8G7zzgKEOPUoYHvGz1TBCxMkd3kwNVbU0gKHkx+iZILf77IofhrY1nYFnB/lQPb79drWOyJVa/DAvg9B/rLB4cC+Nqgdz/TvBbBnr6GBReqn/nRmDgaQEej7WhonozjF+Y2I/fZou/qAAAAAElFTkSuQmCC); display:block; height:44px; margin:0 auto -44px; position:relative; top:-22px; width:44px;"></div></div><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/p/' +
        videoId + '/" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A video posted by Kate Upton (@kateupton)</a> on <time style=" font-family:Arial,sans-serif; font-size:14px; line-height:17px;" datetime="2016-02-05T15:02:00+00:00">Feb 5, 2016 at 7:02am PST</time></p></div></blockquote>';
    }
    return video;
  }



}
