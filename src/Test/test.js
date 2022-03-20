const chai = require('chai')
const chaiHttp = require('chai-http')
const API = 'http://localhost:5000'
// Assertion style
chai.should()
chai.use(chaiHttp)
describe('Routes API', () => {
    /* Test the GET route */
    describe('GET /api/v1/user', () => {
        it('It should GET all users', (done) => {
            chai.request(API)
                .get('/api/v1/user')
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('object')
                    done()
                })
        })
    })
    it('It should NOT GET users with wrong API', (done) => {
        chai.request(API)
            .get('/api/v1/users')
            .end((err, response) => {
                response.should.have.status(404)
                done()
            })
    })
  
});