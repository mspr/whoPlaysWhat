const mongoose = require('mongoose');
const Song = mongoose.model('Song');

let BandSchema = new mongoose.Schema({
  name: { type: String, required: [true, "can't be blank"], index: true},
  picture: { data: Buffer, contentType: string },
  musicians: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Musician' }],
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }]
}, { timestamps: true });

BandSchema.pre('remove', (next) => {
  Song.remove({ bandIs: this._id }).exec();
  next();
})

BandSchema.methods.toDto = function () {
  return {
    id: this._id,
    name: this.name,
    musicians: this.musicians.map((musician) => { return musician.toDto(); }),
    songs: this.songs.map((song) => { return song.toDto(); })
  }
}

mongoose.model('Band', BandSchema);
