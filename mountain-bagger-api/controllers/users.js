const User = require('../models/user');

exports.create = (req, res) => {
  const user = new User({
    surname: req.body.surname,
    email: req.body.email,
  });

  user.save().then(() => {
    res.status(201).json(user);
  });
};