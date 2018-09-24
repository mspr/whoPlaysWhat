const mongoose = require('mongoose');

let SongSchema = new mongoose.Schema({
  title: { type: String, required: [true, "can't be blank"], index: true}
});

mongoose.model('Song', SongSchema);
