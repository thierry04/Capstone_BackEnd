"use strict";

var chai = require('chai');

var chaiHttp = require('chai-http');

var API = 'http://localhost:5000'; // Assertion style

chai.should();
chai.use(chaiHttp);
describe('Routes API', function () {
  /* Test the GET route */
  describe('GET /api/v1/user', function () {
    it('It should GET all users', function (done) {
      chai.request(API).get('/api/v1/user').end(function (err, response) {
        response.should.have.status(200);
        response.body.should.be.a('object');
        done();
      });
    });
  });
  it('It should NOT GET users with wrong API', function (done) {
    chai.request(API).get('/api/v1/users').end(function (err, response) {
      response.should.have.status(404);
      done();
    });
  });
});