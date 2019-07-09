const Map = require('../models/map');

exports.postMap = (req, res) => {
  const { userId } = req.params;
  const { name, img, dimensions, boundingBox } = req.body;

    const map = new Map({
      name: name,
      img: img,
      dimensions: {
        width: dimensions.width,
        height: dimensions.height,
      },
      boundingBox: {
        _ne: {
          lat: boundingBox._ne.lat,
          lng: boundingBox._ne.lng,
        },
        _sw: {
          lat: boundingBox._sw.lat,
          lng: boundingBox._sw.lng,
        },
      },
      userId: { 
        _id: userId,
      },
    });

    map.save().then((err, map) => {
      if (map) {
        res.status(201).json(map);
      } else {
        res.status(400).send({ error: 'The map could not be saved.' });
      }
    });
};

exports.getMap = (req, res) => {
  Map.findOne({}, 'map createdAt', (err, map) => {
    if (map) {
      res.status(200).json(map);
    } else {
      res.status(400).json({ error: 'The map could not be retrieved.' });
    }
  }).sort({ createdAt: 'desc' });
};
