'use strict';

var passport = require('passport');
var config = require('../config/environment');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var _ = require('lodash');
var compose = require('composable-middleware');
var User = require('../api/user/user.model');
var validateJwt = expressJwt({
  secret: config.secrets.session
});

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function isAuthenticated() {
  return compose()
  // Validate jwt
    .use(function (req, res, next) {
      // allow access_token to be passed through query parameter as well
      if (req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token;
      }
      validateJwt(req, res, next);
    })
    // Attach user to request
    .use(function (req, res, next) {
      User.findByIdAsync(req.user._id)
        .then(function (user) {
          if (!user) {
            return res.status(401).end();
          }
          req.user = user;
          next();
        })
        .catch(function (err) {
          return next(err);
        });
    });
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
function hasRole(roleRequired) {
  if (!roleRequired) {
    throw new Error('Required role needs to be set');
  }

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      var ans = false;
      for (var i in req.user.roles) {
        ans = config.userRoles.indexOf(req.user.roles[i]) >= config.userRoles.indexOf(roleRequired);
        if (ans) break;
      }
      if (ans) {
        next();
      }
      else {
        res.status(403).send('Forbidden');
      }

    });
}

/**
 * Checks if the user roles meets the minimum requirements of the route
 */
function hasRoles(rolesRequired) {
  if (!rolesRequired) {
    throw new Error('Required role needs to be set');
  }

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      if (_.intersection(rolesRequired, req.user.roles).length > 0) {
        next();
      }
      else {
        res.status(403).send('Forbidden');
      }

    });
}

/**
 * Returns a jwt token signed by the app secret
 */
function signToken(id, roles) {
  return jwt.sign({_id: id, roles: roles}, config.secrets.session, {
    expiresInMinutes: 60 * 5
  });
}

/**
 * Set token cookie directly for oAuth strategies
 */
function setTokenCookie(req, res) {
  if (!req.user) {
    return res.status(404).send('Something went wrong, please try again.');
  }
  var token = signToken(req.user._id, req.user.roles);
  res.cookie('token', token);
  res.redirect('/');
}

exports.isAuthenticated = isAuthenticated;
exports.hasRole = hasRole;
exports.hasRoles = hasRoles;
exports.signToken = signToken;
exports.setTokenCookie = setTokenCookie;
