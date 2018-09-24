const mongoose = require('mongoose');

let SongSchema = new mongoose.Schema({
  title: { type: String, required: [true, "can't be blank"], index: true}
});

SongSchema.methods.toDto = function () {
  return {
    id: this._id,
    title: this.title
  }
}

mongoose.model('Song', SongSchema);
