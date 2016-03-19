/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/companies              ->  index
 * POST    /api/companies              ->  create
 * GET     /api/companies/:id          ->  show
 * PUT     /api/companies/:id          ->  update
 * DELETE  /api/companies/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var company = require('./company.model');
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
function removeCompany(groupRes) {
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


// Gets a list of companies by session id
exports.index = function (req, res) {
  company.findAsync({
      '_session': req.query._session
    })
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single company from the DB
exports.show = function (req, res) {
  company.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new company in the DB
exports.create = function (req, companyRes) {
  company.createAsync(req.body)
    .then(function (companyRes) {

      //// After creation of company add company to each user
      //for (var i = 0; i < companyRes.users.length; i++) {
      //  User.findByIdAsync(companyRes.users[i])
      //    .then(function (res,pos) {
      //      res.companys.push({_id: companyRes._id});
      //      res.saveAsync();
      //    })
      //    .catch(function (res) {
      //      handleError(res);
      //    });
      //}

      responseWithResult(companyRes, 201);
    })
    .catch(handleError(companyRes));
};

// Updates an existing company in the DB
exports.update = function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  company.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a company from the DB
exports.destroy = function (req, res) {
  company.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeCompany(res))
    .catch(handleError(res));
};
