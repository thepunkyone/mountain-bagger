const Map = require('../models/map');
const Route = require('../models/routes');

exports.postMap = (req, res) => {
  const { userId } = req.params;
  const { name, img, dimensions, boundingBox } = req.body;

    const map = new Map({
      name: name,
      img: img,
      dimensions: {
        width: dimensions[0],
        height: dimensions[1],
      },
      boundingBox: {
        ne: boundingBox[0],
        sw: boundingBox[1],
      },
      userId: { 
        _id: userId,
      },
    });

    map.save().then(() => {
      res.status(201).json(map);
    });
};

exports.deleteMap = (req, res) => {
  const { mapId } = req.params;
  
  Map.findByIdAndDelete(mapId, (err, map) => {
    if (!map) {
      res.status(404).json({ error: 'The map could not be found.'});
    } else {
      res.sendStatus(204);
    }
  });   
};

exports.getMaps = (req, res) => {
  const { userId } = req.params;

  Map.find({ userId : userId })
  .sort({ createdAt: 'desc' })
  .then((maps) => {
    if (maps) {
      res.status(200).json(maps);
    } else {
      res.status(400).json({ error: 'The map could not be retrieved.' });
    }
  });
};
