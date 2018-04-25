const router = require('express').Router();
const Temp = require('./models/Temp');
const Recipe = require('./models/Recipe');


router.post('/', (req, res) => {
   Recipe.findOne({
      $and: [{ fermStart: { $exists: true } }, { fermStop: { $exists: false } }],
   }).then(recipe => {
      if (recipe) {
         var temp = new Temp({
            temperature: req.body.Temp,
            gravity: req.body.SG,
            recipe_id: recipe.id
         });

         temp.save(function (err) {
            if (err) { console.log('ERR', err); res.end(); }
            res.end();
         });
      } else {
         console.log('No active brew');
         res.end();
      }
   });
});

router.get('/:recipeId', (req, res) => {
   Temp.find({ recipe_id: req.params.recipeId }).sort({ measured_at: 1 }).exec((err, temps) => {
      if (err) { return res.status(500).send(err) }

      const returnValues = temps.map(temp => {
         return {
            measured_at: temp.measured_at,
            temperature: temp.temperature,
            gravity: temp.gravity,
            recipe_id: temp.recipe_id
         }
      });

      res.status(200).send(returnValues);

   });
})

module.exports = router;
