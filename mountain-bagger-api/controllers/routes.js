const Route = require('../models/routes');

exports.saveRoute = (req, res) => {
  const route = new Route({
    name: req.body.name,
    duration: req.body.duration,
    distance: req.body.distance,
    mapImage: req.body.mapImage,
    route: req.body.route, 
  });
  route.save().then((data) => {
    res.status(200).json(data);
  });
}

exports.listRoutes = (req, res) => {
  Artist.find({}, (err, artists) => {
    if (!artists) {
      res.status(400).json({ error: 'There is an error' });
    } else {
      res.status(200).json(artists);
    }
  });
};
