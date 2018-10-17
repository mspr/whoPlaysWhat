const mongoose = require('mongoose');
const Song = mongoose.model('Song');

const frequencies = ['Once', 'OncePerWeek', 'EveryDay'];

let CalendarEventSchema = new mongoose.Schema
(
  {
    title: { type: String, required: [true, "can't be blank"], index: true },
    description: { type: String },
    start: { type: Date },
    end: { type: Date },
    frequency: { type: String, enum: frequencies },
    picture: { type: String }
  },
  {
    timestamps: true
  }
);

CalendarEventSchema.methods.toDto = function ()
{
  return {
    id: this._id,
    title: this.title,
    description: this.description,
    start: this.start,
    end: this.end,
    picture: this.picture
  }
}

CalendarEventSchema.statics.frequencies = function () {
  return frequencies;
};

mongoose.model('CalendarEvent', CalendarEventSchema);
