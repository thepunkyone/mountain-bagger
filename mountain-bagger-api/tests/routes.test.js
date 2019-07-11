const mongoose = require('mongoose');
const Route = require('../src/models/routes');
const User = require('../src/models/user');
// const RouteHelpers = require('./helpers/route-helpers.js');
// const DataFactory = require('./helpers/data-factory');

describe('/user/', () => {
  let user;

  beforeEach((done) => {
    User.create({
      firstName: 'Richard',
      surname: 'Pentecost',
      email: 'richard@hotmail.com',
      password: '1234',
    }, (error, document) => {
      if (error) {
        console.log(error, 'error');
      } else {
        user = document;
      };
      done();
    });
  });

  afterEach((done) => {
    mongoose.connection.dropDatabase(() => {
      done();
    });
  });

  describe('GET /user', () => {
    it('sends back a status of 200', (done) => {
      chai.request(server)
        .get('/user')
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(200);
          done();
        });
    });
  }); 

  describe('POST /user/:userId/save-route', () => {
    it('saves a route', (done) => {
    
      chai.request(server)
        .post(`/user/${user._id}/save-route`)
        .send({
          name: 'Scafell',
          duration: 1,
          distance: 3,
          mapImage: 'abcd',
          route: [[32, 33], [54, 17]],
        })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(200);
          Route.findById(res.body._id, (err, route) => {
            console.log(route);
            expect(err).to.equal(null);
            expect(route.name).to.equal('Scafell');
            expect(route.duration).to.equal(1);
            expect(route.distance).to.equal(3);
            expect(route.mapImage).to.equal('abcd');
            expect(route.route[0][0]).to.equal(32);
            expect(route.route[0][1]).to.equal(33);
            expect(route.route[1][0]).to.equal(54);
            expect(route.route[1][1]).to.equal(17);
            expect(route.userId).to.eql(user._id);
            done();
          });
        });
    });
  });

});
