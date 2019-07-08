//{
 // "type" : "Point",
 // "coordinates" : [
 //   -122.5,
 //   37.7
 // ]
 //}

const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
});

const citySchema = new mongoose.Schema({
  name: String,
  location: {
    type: pointSchema,
    required: true
  }
});