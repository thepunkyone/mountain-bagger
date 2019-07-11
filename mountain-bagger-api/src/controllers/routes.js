const Route = require('../models/routes');
const User = require('../models/user');

exports.status = (req, res) => {
  res.sendStatus(200);
}

exports.saveRoute = (req, res) => {
  console.log(req.body);
  const route = new Route({
    name: req.body.name,
    duration: req.body.duration,
    distance: req.body.distance,
    walkingOrCycling: req.body.walkingOrCycling,
    route: req.body.route, 
    userId: req.params.userId
  });

  User.findById(req.params.userId, (err, user) => {
    if (!user) {
      res.status(404).json({ error: 'This user could not be found.' });
    } else {
      route.save().then(() => {
        res.status(200).json(route);
      });
    }
  })
}

exports.listRoutes = (req, res) => {
  User.findById(req.params.userId, (err, user) => {
    if (!user) {
      res.status(400).json({ error: 'This user could not be found'})
    } else {
      Route.find({ userId: req.params.userId }, (err, route) => {
        if (!route) {
          res.status(400).json({ error: 'There is an error' });
        } else {
          res.status(200).json(route);
        }
      });
    }
  })
};

exports.findRoute = (req, res) => {
  User.findById(req.params.userId, (err, user) => {
    if (!user) { 
      res.status(400).json({ error: 'This user could not be found' });
    } else {
      Route.findById(req.params.routeId, (err, route) => {
        if (!route) { 
          res.status(400).json({ error: 'Route information could not be found' });
        } else {
          res.status(200).json(route);
        }
      })
    }
  })
}

exports.deleteRoute = (req, res) => {
  User.findById(req.params.userId, (err, user) => {
    if (!user) { 
      res.status(400).json({ error: 'This user could not be found' });
    } else {
      Route.findByIdAndDelete(req.params.routeId, (err) => {
        if (err) { 
          res.status(400).json({ error: 'Route could not be found' });
        } else {
          res.status(200).send();
        }
      })
    }
  })
}

