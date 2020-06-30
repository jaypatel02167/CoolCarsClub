const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
  fName: String,
  lName: String,
  username: String,
  password: String,
  connectionList: [
    {
      connectionID: { type: String },
      rsvp: { type: String },
    },
  ],
});

module.exports = mongoose.model('User', userSchema);
