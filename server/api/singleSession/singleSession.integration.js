'use strict';

var app = require('../..');
var request = require('supertest');

var newSingleSession;

describe('SingleSession API:', function() {

  describe('GET /api/singleSessions', function() {
    var singleSessions;

    beforeEach(function(done) {
      request(app)
        .get('/api/singleSessions')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          singleSessions = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      singleSessions.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/singleSessions', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/singleSessions')
        .send({
          name: 'New SingleSession',
          info: 'This is the brand new singleSession!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newSingleSession = res.body;
          done();
        });
    });

    it('should respond with the newly created singleSession', function() {
      newSingleSession.name.should.equal('New SingleSession');
      newSingleSession.info.should.equal('This is the brand new singleSession!!!');
    });

  });

  describe('GET /api/singleSessions/:id', function() {
    var singleSession;

    beforeEach(function(done) {
      request(app)
        .get('/api/singleSessions/' + newSingleSession._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          singleSession = res.body;
          done();
        });
    });

    afterEach(function() {
      singleSession = {};
    });

    it('should respond with the requested singleSession', function() {
      singleSession.name.should.equal('New SingleSession');
      singleSession.info.should.equal('This is the brand new singleSession!!!');
    });

  });

  describe('PUT /api/singleSessions/:id', function() {
    var updatedSingleSession

    beforeEach(function(done) {
      request(app)
        .put('/api/singleSessions/' + newSingleSession._id)
        .send({
          name: 'Updated SingleSession',
          info: 'This is the updated singleSession!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedSingleSession = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSingleSession = {};
    });

    it('should respond with the updated singleSession', function() {
      updatedSingleSession.name.should.equal('Updated SingleSession');
      updatedSingleSession.info.should.equal('This is the updated singleSession!!!');
    });

  });

  describe('DELETE /api/singleSessions/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/singleSessions/' + newSingleSession._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when singleSession does not exist', function(done) {
      request(app)
        .delete('/api/singleSessions/' + newSingleSession._id)
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
