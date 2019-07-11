const Point = require('../models/point');

exports.create = (req, res) => {
  const point = new Point({
// some validation
  });

  user.save().then(() => {
    res.status(201).json(point);
  });
};

exports.find = (req, res) => { // this is the controller you wrote in the first part of this step
    Point.findOne({ _id: req.params.id }, (err, point) => {
      if (point === null) {
        res.status(404).json({ error: 'The point could not be found.' });
      } else {
        res.status(200).json(point);
      }
    });
  }