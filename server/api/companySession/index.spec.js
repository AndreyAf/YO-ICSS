'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var companySessionCtrlStub = {
  index: 'companySessionCtrl.index',
  show: 'companySessionCtrl.show',
  create: 'companySessionCtrl.create',
  update: 'companySessionCtrl.update',
  destroy: 'companySessionCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var companySessionIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './companySession.controller': companySessionCtrlStub
});

describe('CompanySession API Router:', function() {

  it('should return an express router instance', function() {
    companySessionIndex.should.equal(routerStub);
  });

  describe('GET /api/companySessions', function() {

    it('should route to companySession.controller.index', function() {
      routerStub.get
        .withArgs('/', 'companySessionCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/companySessions/:id', function() {

    it('should route to companySession.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'companySessionCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/companySessions', function() {

    it('should route to companySession.controller.create', function() {
      routerStub.post
        .withArgs('/', 'companySessionCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/companySessions/:id', function() {

    it('should route to companySession.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'companySessionCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/companySessions/:id', function() {

    it('should route to companySession.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'companySessionCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/companySessions/:id', function() {

    it('should route to companySession.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'companySessionCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
