const faker = require('faker');

exports.route = (options = {}) => ({
  name: options.name || faker.lorem.word(),
  duration: options.durations || faker.random.number(),
  distance: options.distance || faker.random.number(),
  mapImage: options.mapImage || faker.image.image(),
  route: options.route || [[faker.address.longitude(), faker.address.latitude()], [faker.address.longitude(), faker.address.latitude()]],
  userId: options.userId || faker.random.alphaNumeric(),
});
