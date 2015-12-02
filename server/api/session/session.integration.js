'use strict';

var app = require('../..');
var request = require('supertest');

var newSession;

describe('Session API:', function() {

  describe('GET /api/sessions', function() {
    var sessions;

    beforeEach(function(done) {
      request(app)
        .get('/api/sessions')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          sessions = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      sessions.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/sessions', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/sessions')
        .send({
          name: 'New Session',
          info: 'This is the brand new session!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newSession = res.body;
          done();
        });
    });

    it('should respond with the newly created session', function() {
      newSession.name.should.equal('New Session');
      newSession.info.should.equal('This is the brand new session!!!');
    });

  });

  describe('GET /api/sessions/:id', function() {
    var session;

    beforeEach(function(done) {
      request(app)
        .get('/api/sessions/' + newSession._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          session = res.body;
          done();
        });
    });

    afterEach(function() {
      session = {};
    });

    it('should respond with the requested session', function() {
      session.name.should.equal('New Session');
      session.info.should.equal('This is the brand new session!!!');
    });

  });

  describe('PUT /api/sessions/:id', function() {
    var updatedSession

    beforeEach(function(done) {
      request(app)
        .put('/api/sessions/' + newSession._id)
        .send({
          name: 'Updated Session',
          info: 'This is the updated session!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedSession = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSession = {};
    });

    it('should respond with the updated session', function() {
      updatedSession.name.should.equal('Updated Session');
      updatedSession.info.should.equal('This is the updated session!!!');
    });

  });

  describe('DELETE /api/sessions/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/sessions/' + newSession._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when session does not exist', function(done) {
      request(app)
        .delete('/api/sessions/' + newSession._id)
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
