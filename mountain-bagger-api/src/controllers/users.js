const User = require('../models/user');

exports.create = (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    surname: req.body.surname,
    email: req.body.email,
    password: req.body.password,
  });

  user.save().then(() => {
    res.status(201).json(user);
  });
};

exports.getUser = (req,res) => {
  const { email, password } = req.body;

  User.find({ email: email, password: password }, (err, user) => {
    if (user) {
      res.status(200).json({userId: user[0]._id, firstName: user[0].firstName})
    } else {
      res.status(404).json({ error: 'password or email not matched'})
    }
  })
}
 