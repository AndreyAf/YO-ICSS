'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var singleSessionCtrlStub = {
  index: 'singleSessionCtrl.index',
  show: 'singleSessionCtrl.show',
  create: 'singleSessionCtrl.create',
  update: 'singleSessionCtrl.update',
  destroy: 'singleSessionCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var singleSessionIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './singleSession.controller': singleSessionCtrlStub
});

describe('SingleSession API Router:', function() {

  it('should return an express router instance', function() {
    singleSessionIndex.should.equal(routerStub);
  });

  describe('GET /api/singleSessions', function() {

    it('should route to singleSession.controller.index', function() {
      routerStub.get
        .withArgs('/', 'singleSessionCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/singleSessions/:id', function() {

    it('should route to singleSession.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'singleSessionCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/singleSessions', function() {

    it('should route to singleSession.controller.create', function() {
      routerStub.post
        .withArgs('/', 'singleSessionCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/singleSessions/:id', function() {

    it('should route to singleSession.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'singleSessionCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/singleSessions/:id', function() {

    it('should route to singleSession.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'singleSessionCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/singleSessions/:id', function() {

    it('should route to singleSession.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'singleSessionCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
