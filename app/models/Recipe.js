const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
   name: { type: String, required: true },
   id: { type: String, required: true, unique: true },
   recipe: { type: String },
   versions: { type: [String] }

});

const Recipe = mongoose.model('Recipe', recipeSchema);



module.exports = Recipe;