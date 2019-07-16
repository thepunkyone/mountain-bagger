const mongoose = require('mongoose');
const app = require('./src/app');
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }, () => {
  app.listen(3030, () => console.log('App listening on port 3030!'));
});