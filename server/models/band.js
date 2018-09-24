const mongoose = require('mongoose');

let BandSchema = new mongoose.Schema({
  name: { type: String, required: [true, "can't be blank"], index: true},
  musicians: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Musician' }],
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }]
}, { timestamps: true });

mongoose.model('Band', BandSchema);
