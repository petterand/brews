const router = require('express').Router();
const Recipe = require('./models/Recipe');

const isLoggedIn = require('./AuthHelpers').isLoggedIn;

router.post('/', isLoggedIn, (req, res) => {
   var newRecipe = req.body;
   var recipe = new Recipe({
      id: newRecipe.name.replace(/\s/g, '_').toLowerCase(),
      name: newRecipe.name,
      recipe: JSON.stringify(newRecipe),
   });
   recipe.save((err) => {
      if (err) { return res.status(500).send({ status: 'error', msg: err }); }
      var savedRecipe = {
         id: recipe.id,
         name: recipe.name,
         recipe: JSON.parse(recipe.recipe)
      }
      res.send({ status: 'added', recipe: savedRecipe });
   });
});

router.get('/', (req, res) => {
   Recipe.find({}).then((recipes) => {
      recipes = recipes.map((item => {
         const versions = item.versions.map(v => JSON.parse(v));
         const latestVersionNumber = Math.max(versions.map(v => parseInt(v.version)));
         return {
            id: item.id,
            name: item.name,
            versions,
            latestVersionNumber
         }
      }));
      res.send(recipes);
   }, (err) => {
      res.status(500).send({ status: 'error', msg: err });
   });
});

router.delete('/:id', isLoggedIn, (req, res) => {
   var recipeId = req.params.id;
   Recipe.remove({ id: recipeId }).then(() => {
      res.send({ status: 'removed' });
   }, (err) => {
      res.status(500).send({ status: 'error', msg: err });
   });
});

// router.put('/all/updateVersions', (req, res) => {
//    var promises = [];
//    Recipe.find({}, (err, recipes) => {
//       recipes.forEach(r => {
//          r.versions = r.versions.map(v => JSON.parse(v));

//          r.save((err, r) => {
//             if (err) { return promises.push(Promise.reject(err)) }
//             promises.push(Promise.resolve('ok'));
//          })
//       });

//       Promise.all(promises).then(result => {
//          res.status(200).send('all updated');
//       }).catch(err => {
//          res.status(500).send(err);
//       });
//    });
// })

router.put('/:id', isLoggedIn, (req, res) => {
   var updatedRecipe = req.body;
   Recipe.findOne({ id: req.params.id }, (err, recipe) => {
      if (err) { return res.status(500).send({ status: 'error', msg: err }); }
      recipe.recipe = JSON.stringify(updatedRecipe.recipe) || recipe.recipe;
      recipe.save((err, r) => {
         if (err) { return res.status(500).send({ status: 'error', msg: err }); }
         r.recipe = JSON.parse(r.recipe);
         res.send({ status: 'updated', recipe: r });
      });
   });
});

module.exports = router;