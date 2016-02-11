'use strict';

var User = require('../models/users.js');
var passport = require('passport');
var mongoose = require('mongoose');
var assign = require('object-assign');

function UserHandler() {
  this.signup = function(req, res, next) {
    req.assert('displayName', 'Name must not be empty').notEmpty();
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('password', 'Password must be at least 4 characters long').len(4);
    req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);

    var errors = req.validationErrors();
    if (errors) {
      return res.status(400).json(errors[0]);
    }

    var user = new User(req.body);

    User.findOne({
      email: user.email
    }, function(err, existingUser) {
      if (existingUser) {
        return res.status(400).json({
          msg: 'Account with that email address already exists.'
        });
      }
      user.save(function(err) {
        if (err) {
          return res.status(400).json({
            msg: 'There was an error saving user'
          });
        }
        return res.json(user);
      });
    });


  }


  this.updateUser = function(req, res, next) {
    console.log("updating user",req.body._id);

    User.findOne({
      _id: mongoose.Types.ObjectId(req.body._id)
    }, function(err, existingUser) {
      //check if user is in database
      console.log("found user", existingUser);
      if (existingUser) {
        //merge changes into existing user
        
        var updatedUser = assign(existingUser, req.body);
        updatedUser.save(function(err) {
          if (err) {
            return res.status(400).json({
              msg: 'There was an error saving user'
            });
          }
          return res.json(updatedUser);
        });
      }
      else {
        //could not find user to update in db
        return res.status(400).json({
          msg: 'There was an error saving user'
        });
      }


    });


  }


  /**
   * POST /login
   * Sign in using email and password.
   */
  this.login = function(req, res, next) {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('password', 'Password cannot be blank').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
      return res.status(400).json(errors[0]);
    }

    passport.authenticate('local', function(err, user, info) {
      if (err) {
        console.error(err);
        return next(err);
      }
      if (!user) {
        console.error({
          msg: info.message
        });
        return res.status(400).json({
          msg: info.message
        });
      }
      req.logIn(user, function(err) {
        if (err) {
          console.error(err);
          return next(err);
        }
        return res.json({
          msg: 'Success! You are logged in.'
        });
      });
    })(req, res, next);
  };
}

module.exports = UserHandler;