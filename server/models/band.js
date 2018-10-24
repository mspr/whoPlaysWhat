const mongoose = require('mongoose');
const Song = mongoose.model('Song');

let BandSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "can't be blank"], index: true},
    picture: { type: String },
    musicians: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Musician' }],
    musiciansColor: [],
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
    incomingSongs: [{ type: mongoose.Schema.Types.ObjectId, red: 'IncomingSong' }],
    notes: [{ type: String }],
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CalendarEvent' }]
  },
  {
    timestamps: true
  }
);

BandSchema.pre('remove', (next) =>
{
  Song.remove({ bandId: this._id }).exec();
  IncomingSong.remove({ bandId: this._id }).exec();
  CalendarEvent.remove({ bandId: this._id }).exec();
  next();
})

BandSchema.methods.toDto = function ()
{
  return {
    id: this._id,
    name: this.name,
    picture: this.picture,
    musicians: this.musicians.map((musician) => { return musician.toDto(); }),
    musiciansColor: this.musiciansColor,
    songs: this.songs.map((song) => { return song.toDto(); }),
    incomingSongs: this.incomingSongs.map((song) => { return song.toDto(); }),
    notes: this.notes,
    events: this.events.map((event) => { return event.toDto(); })
  }
}

mongoose.model('Band', BandSchema);
