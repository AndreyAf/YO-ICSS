'use strict';

var express = require('express');
var controller = require('./user.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.get('/:id/getPossibleContacts', auth.isAuthenticated(), controller.getPossibleContacts);
router.put('/:id/addContact', auth.isAuthenticated(), controller.addContact);
router.put('/:id/addGroup', auth.isAuthenticated(), controller.addGroup); // TODO
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);

module.exports = router;
