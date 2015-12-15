'use strict';

var express = require('express');
var controller = require('./singleSession.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

// get session by current user and item id.
router.get('/:id/:otherId/getSession', controller.getSession);


module.exports = router;
