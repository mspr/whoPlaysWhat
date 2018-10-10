const mongoose = require('mongoose');

const roles = ['Guitarist', 'Singer', 'Keyboarder', 'Bassist', 'Drumer', 'Saxophonist', 'Chorus', 'Violinist'];

function colorValidator(color)
{
  if (color.indexOf('#') == 0)
  {
    if (color.length == 7) // #f0f0f0
      return true;
    else if (color.length == 4) // #fff
      return true;
  }

  return false;
};

let MusicianSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "can't be blank"], index: true },
    color: { type: String, validate: [colorValidator, 'not a valid color'] },
    roles: [{ type: String, enum: roles }]
  },
  {
    timestamps: true
  }
);

MusicianSchema.methods.toDto = function ()
{
  return {
    id: this._id,
    name: this.name,
    color: this.color,
    roles: this.roles
  }
}

mongoose.model('Musician', MusicianSchema);
