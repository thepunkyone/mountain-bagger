const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  name: String,
  duration: Number,
  distance: Number,
  mapImage: String,
  route: [[Number, Number]],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
})

const Route = mongoose.model('Route', routeSchema);

module.exports = Route;
