const mongoose = require('mongoose');

const tonalities = ['A', 'Bb', 'B', 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#'];
const levels = ['Finger in the nose', 'Easy', 'Not so simple', 'Hard', 'Good luck!'];

let SongSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "can't be blank"], index: true},
    tempo: { type: Number },
    level: { type: String, enum: levels },
    progression: { type: Number, min: 0, max: 100 },
    tonality: { type: String, enum: tonalities }
  },
  {
    timestamps: true
  }
);

SongSchema.methods.toDto = function ()
{
  return {
    id: this._id,
    title: this.title,
    tempo: this.tempo,
    level: this.level,
    tonality: this.tonality,
    progression: this.progression
  }
}

SongSchema.statics.levels = function () {
  return levels;
};

SongSchema.statics.tonalities = function() {
  return tonalities;
};

mongoose.model('Song', SongSchema);
