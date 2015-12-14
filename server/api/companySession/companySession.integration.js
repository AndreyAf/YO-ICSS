'use strict';

var app = require('../..');
var request = require('supertest');

var newCompanySession;

describe('CompanySession API:', function() {

  describe('GET /api/companySessions', function() {
    var companySessions;

    beforeEach(function(done) {
      request(app)
        .get('/api/companySessions')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          companySessions = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      companySessions.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/companySessions', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/companySessions')
        .send({
          name: 'New CompanySession',
          info: 'This is the brand new companySession!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newCompanySession = res.body;
          done();
        });
    });

    it('should respond with the newly created companySession', function() {
      newCompanySession.name.should.equal('New CompanySession');
      newCompanySession.info.should.equal('This is the brand new companySession!!!');
    });

  });

  describe('GET /api/companySessions/:id', function() {
    var companySession;

    beforeEach(function(done) {
      request(app)
        .get('/api/companySessions/' + newCompanySession._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          companySession = res.body;
          done();
        });
    });

    afterEach(function() {
      companySession = {};
    });

    it('should respond with the requested companySession', function() {
      companySession.name.should.equal('New CompanySession');
      companySession.info.should.equal('This is the brand new companySession!!!');
    });

  });

  describe('PUT /api/companySessions/:id', function() {
    var updatedCompanySession

    beforeEach(function(done) {
      request(app)
        .put('/api/companySessions/' + newCompanySession._id)
        .send({
          name: 'Updated CompanySession',
          info: 'This is the updated companySession!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCompanySession = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCompanySession = {};
    });

    it('should respond with the updated companySession', function() {
      updatedCompanySession.name.should.equal('Updated CompanySession');
      updatedCompanySession.info.should.equal('This is the updated companySession!!!');
    });

  });

  describe('DELETE /api/companySessions/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/companySessions/' + newCompanySession._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when companySession does not exist', function(done) {
      request(app)
        .delete('/api/companySessions/' + newCompanySession._id)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
