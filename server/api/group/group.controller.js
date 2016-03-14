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

function addGroupToUser(groupRes, status) {
  //After creation of group add group to each user
  if (groupRes.users) {
    for (var i = 0; i < groupRes.users.length; i++) {
      User.findByIdAsync(groupRes.users[i])
        .then(function (res, pos) {
          res.groups.push({_id: groupRes._id});
          res.saveAsync();
        })
        .catch(function (res) {
          handleError(res);
        });
    }
  }
  return responseWithResult(groupRes, status);
}

function removeGroupFromUser(groupRes) {
  console.log(groupRes);
  // TODO: rewrite
  //for (var i = 0; i < groupRes.users.length; i++) {
  //  User.findByIdAsync(groupRes.users[i])
  //    .then(function (res, pos) {
  //      res.groups.pull({_id: groupRes._id});
  //      res.saveAsync();
  //    })
  //    .catch(function (res) {
  //      handleError(res);
  //    });
  //}

  return removeEntity(groupRes);
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
    .then(addGroupToUser(groupRes, 201))
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
    .then(removeGroupFromUser(res))
    .catch(handleError(res));
};
