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
      ne: [Number, Number],
      sw: [Number, Number],
    },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {timestamps: true}
);

module.exports = mongoose.model('Map', MapSchema);