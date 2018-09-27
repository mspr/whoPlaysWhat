const mongoose = require('mongoose');

let MusicianSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "can't be blank"], index: true}
  },
  {
    timestamps: true
  }
);

MusicianSchema.methods.toDto = function ()
{
  return {
    id: this._id,
    name: this.name
  }
}

mongoose.model('Musician', MusicianSchema);
