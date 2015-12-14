/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/singleSessions              ->  index
 * POST    /api/singleSessions              ->  create
 * GET     /api/singleSessions/:id          ->  show
 * PUT     /api/singleSessions/:id          ->  update
 * DELETE  /api/singleSessions/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var SingleSession = require('./singleSession.model');

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

// Gets a list of SingleSessions
exports.index = function (req, res) {
  SingleSession.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single SingleSession from the DB
exports.show = function (req, res) {
  SingleSession.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new SingleSession in the DB
exports.create = function (req, res) {
  SingleSession.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing SingleSession in the DB
exports.update = function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  SingleSession.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a SingleSession from the DB
exports.destroy = function (req, res) {
  SingleSession.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};

// Gets a single Session by current participant id and second participant id
exports.getSession = function (req, res) {

  // TODO: check both sides
  // Check If exists single session for current user and selected contact
  SingleSession.findOne(
    {'participantOne._participant': req.params.id},
    {'participantTwo._participant': req.body._participantTwo}
    //,
    //{
    //  $or: [
    //      { 'participantOne._participant' :req.body._participantTwo},
    //      { 'participantOne._participant':req.params.id}
    //  ]
    //}
    , function (err, user){

      if(user){
        responseWithResult(user);
      }
      else {
        var participantOne = {
          _participant: req.params.id
        }, participantTwo = {
          _participant: req.body._participantTwo
        }, session = {
          participantOne: participantOne,
          participantTwo: participantTwo
        };

        SingleSession.createAsync(session)
          .then(responseWithResult(res, 201))
          .catch(handleError(res));
      }
    });
};
