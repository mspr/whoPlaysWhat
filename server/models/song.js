const mongoose = require('mongoose');

let SongSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "can't be blank"], index: true},
    tempo: { type: Number },
    level: { type: String, enum: ['very simple', 'simple', 'advanced', 'hard', 'evil'] },
    progression: { type: Number, min: 0, max: 100 },
    tonality: { type: String, enum: ['A', 'Bb', 'B', 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#'] }
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
    level: this.evil,
    progression: this.progression,
    tonality: this.tonality
  }
}

mongoose.model('Song', SongSchema);
