const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  appId: { type: String, required: true },  // identifica de qual app veio
  userId: { type: String },                 // opcional: id do usuário
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Location', locationSchema);
