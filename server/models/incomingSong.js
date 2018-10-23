const mongoose = require('mongoose');

const levels = ['Finger in the nose', 'Easy', 'Not so simple', 'Hard', 'Good luck!'];

let IncomingSongSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "can't be blank"], index: true},
    level: { type: String, enum: levels },
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
    proposer: this.proposer,
    musiciansFeedback: this.musiciansFeedback
  }
}

IncomingSongSchema.statics.levels = function () {
  return levels;
};

mongoose.model('IncomingSong', IncomingSongSchema);
