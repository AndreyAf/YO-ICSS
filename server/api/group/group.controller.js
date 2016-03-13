/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/groups              ->  index
 * POST    /api/groups              ->  create
 * GET     /api/groups/:id          ->  show
 * PUT     /api/groups/:id          ->  update
 * DELETE  /api/groups/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var group = require('./group.model');
var User = require('../user/user.model');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function (entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(function (updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.removeAsync()
        .then(function () {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of groups by session id
exports.index = function (req, res) {
  group.findAsync({
      '_session': req.query._session
    })
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single group from the DB
exports.show = function (req, res) {
  group.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new group in the DB
exports.create = function (req, groupRes) {
  group.createAsync(req.body)
    .then(function (groupRes) {

      // After creation of group add group to each user
      for (var i = 0; i < groupRes.users.length; i++) {
        User.findByIdAsync(groupRes.users[i])
          .then(function (res,pos) {
            res.groups.push({_id: groupRes._id});
            res.saveAsync();
          })
          .catch(function (res) {
            handleError(res);
          });
      }

      responseWithResult(groupRes, 201);
    })
    .catch(handleError(groupRes));
};

// Updates an existing group in the DB
exports.update = function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  group.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a group from the DB
exports.destroy = function (req, res) {
  group.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(function(res){

      // on delete group remove group from all group users
      for (var i = 0; i < res.users.length; i++) {
        User.findByIdAsync(res.users[i])
          .then(function (resUser, pos) {
            resUser.groups.pull({_id: res._id});
            resUser.saveAsync();
          })
          .catch(function (res) {
            handleError(res);
          });
      }

      removeEntity(res);
    })
    .catch(handleError(res));
};
