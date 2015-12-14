'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var groupSessionCtrlStub = {
  index: 'groupSessionCtrl.index',
  show: 'groupSessionCtrl.show',
  create: 'groupSessionCtrl.create',
  update: 'groupSessionCtrl.update',
  destroy: 'groupSessionCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var groupSessionIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './groupSession.controller': groupSessionCtrlStub
});

describe('GroupSession API Router:', function() {

  it('should return an express router instance', function() {
    groupSessionIndex.should.equal(routerStub);
  });

  describe('GET /api/groupSessions', function() {

    it('should route to groupSession.controller.index', function() {
      routerStub.get
        .withArgs('/', 'groupSessionCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/groupSessions/:id', function() {

    it('should route to groupSession.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'groupSessionCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/groupSessions', function() {

    it('should route to groupSession.controller.create', function() {
      routerStub.post
        .withArgs('/', 'groupSessionCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/groupSessions/:id', function() {

    it('should route to groupSession.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'groupSessionCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/groupSessions/:id', function() {

    it('should route to groupSession.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'groupSessionCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/groupSessions/:id', function() {

    it('should route to groupSession.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'groupSessionCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
