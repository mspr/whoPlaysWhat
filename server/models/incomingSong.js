const mongoose = require('mongoose');

const levels = ['Finger in the nose', 'Easy', 'Not so simple', 'Hard', 'Good luck!'];

let IncomingSongSchema = new mongoose.Schema(
  {
    title: { type: String },
    level: { type: String, enum: levels },
    link: { type: String },
    proposer: { type: mongoose.Schema.Types.ObjectId, red: 'Musician' },
    musiciansFeedback: []
  },
  {
    timestamps: true
  }
);

IncomingSongSchema.methods.toDto = function ()
{
  return {
    id: this._id,
    title: this.title,
    level: this.level,
    link: this.link,
    proposer: this.proposer,
    musiciansFeedback: this.musiciansFeedback
  }
}

IncomingSongSchema.statics.levels = function () {
  return levels;
};

mongoose.model('IncomingSong', IncomingSongSchema);
