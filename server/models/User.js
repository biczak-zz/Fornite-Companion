// grab the things we need
const mongoose = require('mongoose');

const { Schema } = mongoose;

// create a schema
const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: Boolean,
  meta: {
    platform: String,
  },
  created_at: Date,
  last_login: Date,
});

// the schema is useless so far
// we need to create a model using it
const User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;
