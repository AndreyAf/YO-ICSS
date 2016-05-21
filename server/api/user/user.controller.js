'use strict';

var User = require('./user.model');
var Company = require('../company/company.model');
var _ = require('lodash');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function (err) {
    res.status(statusCode).json(err);
  }
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

function respondWith(res, statusCode) {
  statusCode = statusCode || 200;
  return function () {
    res.status(statusCode).end();
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
    updated.companies = updates.companies;
    updated.groups = updates.groups;
    updated.contacts = updates.contacts;
    updated.blackList = updates.blackList;
    return updated.saveAsync()
      .spread(function (updated) {
        return updated;
      });
  };
}

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function (req, res) {
  User.findAsync({}, '-salt -hashedPassword')
    .then(function (users) {
      res.status(200).json(users);
    })
    .catch(handleError(res));
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.roles.push('client');
  newUser.saveAsync()
    .spread(function (user) {
      var token = jwt.sign({_id: user._id}, config.secrets.session, {
        expiresInMinutes: 60 * 5
      });
      res.json({token: token});
    })
    .catch(validationError(res));
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findOne({_id: userId})
    .populate('contacts._contact')
    .populate('companies._company')
    .populate('groups')
    .execAsync()
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    //.then(function (user) {
    //  if (!user) {
    //    return res.status(404).end();
    //  }
    //  //res.json(user.profile);
    //  res.json(user);
    //})
    .catch(function (err) {
      return next(err);
    });
};

// Updates an existing company in the DB
exports.update = function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  User.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function (req, res) {
  User.findByIdAndRemoveAsync(req.params.id)
    .then(function () {
      res.status(204).end();
    })
    .catch(handleError(res));
};

/**
 * Change a users password
 */
exports.changePassword = function (req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findByIdAsync(userId)
    .then(function (user) {
      if (user.authenticate(oldPass)) {
        user.password = newPass;
        return user.saveAsync()
          .then(function () {
            res.status(204).end();
          })
          .catch(validationError(res));
      } else {
        return res.status(403).end();
      }
    });
};

/**
 * Add contact to user
 */
exports.addContact = function (req, res, next) {
  var userId = req.user._id;

  User.findByIdAsync(userId)
    .then(function (user) {
      user.contacts.push(req.body.contact);
      return user.saveAsync()
        .then(function () {
          res.status(204).end();
        })
        .catch(validationError(res));
    });
};

/**
 * Add company to user
 */
exports.addCompany = function (req, res, next) {
  var userId = req.user._id;

  User.findByIdAsync(userId)
    .then(function (user) {
      user.companies.push(req.body.company);
      return user.saveAsync()
        .then(function () {
          res.status(204).end();
        })
        .catch(validationError(res));
    });
};

/**
 * Add group to user
 */
exports.addGroup = function (req, res, next) {
  var userId = req.user._id;

  // TODO: create new group and add user as it admin
};

/**
 * Add contact to user
 */
exports.getPossibleContacts = function (req, res, next) {
  var userId = req.user._id;

  User.findOne({_id: userId})
    .then(function (user) { // don't ever give out the password or salt

      var contactsIds = _.union(_.pluck(user.contacts, '_contact'), [userId]);
      User.findAsync({
          "$and": [
            {"_id": {$nin: contactsIds}}
          ]
        }, '-salt -hashedPassword')
        .populate('groups')
        .then(function (users) {
          res.status(200).json(users);
        })
        .catch(handleError(res));
    })

};

/**
 * Return possible companies
 */
exports.getPossibleCompanies = function (req, res, next) {
  var userId = req.user._id;

  User.findOne({_id: userId})
    .then(function (user) { // don't ever give out the password or salt

      var companiesIds = _.union(_.pluck(user.companies, '_company'), [userId]);
      Company.findAsync({
          "$and": [
            {"_id": {$nin: companiesIds}}
          ]
        })
        .then(function (companies) {
          res.status(200).json(companies);
        })
        .catch(handleError(res));
    })

};

/**
 * Return work companies
 */
exports.getWorkCompanies = function (req, res, next) {
  var userId = req.user._id;

  User.findOne({_id: userId})
    .then(function (user) { // don't ever give out the password or salt

      user.companies = _.filter(user.companies, function (company) {
        return company.role === "employee";
      });

      var companiesIds = _.union(_.pluck(user.companies, '_company'), [userId]);

      Company.findAsync({
          "$and": [
            {"_id": {$in: companiesIds}}
          ]
        })
        .then(function (companies) {
          res.status(200).json(companies);
        })
        .catch(handleError(res));
    })

};

/**
 * Get my infos
 */
exports.me = function (req, res, next) {
  var userId = req.user._id;

  User.findOne({_id: userId}, '-salt -hashedPassword')
    .populate('contacts._contact')
    .populate('companies._company')
    .populate('groups')
    .execAsync()
    .then(function (user) { // don't ever give out the password or salt
      if (!user) {
        return res.status(401).end();
      }
      res.json(user);
    })
    .catch(function (err) {
      return next(err);
    });
};

/**
 * Authentication callback
 */
exports.authCallback = function (req, res, next) {
  res.redirect('/');
};
