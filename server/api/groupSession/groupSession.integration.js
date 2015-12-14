'use strict';

var app = require('../..');
var request = require('supertest');

var newGroupSession;

describe('GroupSession API:', function() {

  describe('GET /api/groupSessions', function() {
    var groupSessions;

    beforeEach(function(done) {
      request(app)
        .get('/api/groupSessions')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          groupSessions = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      groupSessions.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/groupSessions', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/groupSessions')
        .send({
          name: 'New GroupSession',
          info: 'This is the brand new groupSession!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newGroupSession = res.body;
          done();
        });
    });

    it('should respond with the newly created groupSession', function() {
      newGroupSession.name.should.equal('New GroupSession');
      newGroupSession.info.should.equal('This is the brand new groupSession!!!');
    });

  });

  describe('GET /api/groupSessions/:id', function() {
    var groupSession;

    beforeEach(function(done) {
      request(app)
        .get('/api/groupSessions/' + newGroupSession._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          groupSession = res.body;
          done();
        });
    });

    afterEach(function() {
      groupSession = {};
    });

    it('should respond with the requested groupSession', function() {
      groupSession.name.should.equal('New GroupSession');
      groupSession.info.should.equal('This is the brand new groupSession!!!');
    });

  });

  describe('PUT /api/groupSessions/:id', function() {
    var updatedGroupSession

    beforeEach(function(done) {
      request(app)
        .put('/api/groupSessions/' + newGroupSession._id)
        .send({
          name: 'Updated GroupSession',
          info: 'This is the updated groupSession!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedGroupSession = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedGroupSession = {};
    });

    it('should respond with the updated groupSession', function() {
      updatedGroupSession.name.should.equal('Updated GroupSession');
      updatedGroupSession.info.should.equal('This is the updated groupSession!!!');
    });

  });

  describe('DELETE /api/groupSessions/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/groupSessions/' + newGroupSession._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when groupSession does not exist', function(done) {
      request(app)
        .delete('/api/groupSessions/' + newGroupSession._id)
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
