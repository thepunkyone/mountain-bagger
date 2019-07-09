var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var MapSchema = new Schema({
    name: String,
    img: String,
    dimensions: {
      width: Number,
      height: Number,
    },
    boundingBox: {
      _ne: {
        lat: Number,
        lng: Number,
      },
      _sw: {
        lat: Number,
        lng: Number,
      },
    },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {timestamps: true}
);

MapSchema.set('timestamps', true);

module.exports = mongoose.model('Map', MapSchema);