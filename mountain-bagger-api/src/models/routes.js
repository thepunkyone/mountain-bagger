const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  name: String,
  duration: Number,
  distance: Number,
  walkingOrCyling: String,
  route: [[Number, Number]],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  mapId: {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Map',
  }
}, {timestamps: true})

const Route = mongoose.model('Route', routeSchema);

module.exports = Route;
