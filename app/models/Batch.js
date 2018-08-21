const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const batchSchema = new Schema({
   id: { type: String, required: true },
   recipe_id: { type: String, required: true },
   recipe_version: { type: Number, required: true },
   fermStart: { type: Number },
   fermStop: { type: Number },
   notes: { type: String },
   mash_ph: { type: String },
   boil_vol: { type: String },
   preboil_sg: { type: String },
   postboil_vol: { type: String },
   og: { type: String },
   fermentation_vol: { type: String },
   fg: { type: String },
   brewfatherId: { type: Number }
});

const Batch = mongoose.model('Batch', batchSchema);

module.exports = Batch;