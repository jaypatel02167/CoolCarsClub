const mongoose = require('mongoose');

let connectionSchema = new mongoose.Schema({
  ID: String,
  title: String,
  host: String,
  category: String,
  details: String,
  dateAndTime: String,
  location: String,
});

module.exports = mongoose.model('Connections', connectionSchema);
