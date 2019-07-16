const mongoose = require('mongoose');
const app = require('./src/app');

mongoose.connect(process.env.DATABASE_CONN, { useNewUrlParser: true }, () => {
  app.listen(3030, () => console.log('App listening on port 3030!'));
});