const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
firstname: String,
surname: String,
email: String,
password: String
}, {});

mongoose.model('User', UserSchema);