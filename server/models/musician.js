const mongoose = require('mongoose');

let MusicianSchema = new mongoose.Schema({
  name: { type: String, required: [true, "can't be blank"], index: true}
});

mongoose.model('Musician', MusicianSchema);
