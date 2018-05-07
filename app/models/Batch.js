const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const batchSchema = new Schema({
   id: { type: String, required: true },
   recipe_id: { type: String, required: true },
   fermStart: { type: Number },
   fermStop: { type: Number },
   notes: { type: String }
});

const Batch = mongoose.model('Batch', batchSchema);

module.exports = Batch;