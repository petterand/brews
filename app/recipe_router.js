const router = require('express').Router();
const Recipe = require('./models/Recipe');

const isLoggedIn = require('./AuthHelpers').isLoggedIn;

router.post('/', isLoggedIn, (req, res) => {
   var newRecipe = req.body;
   var recipe = new Recipe({
      id: newRecipe.name.replace(/\s/g, '_').toLowerCase(),
      name: newRecipe.name,
      versions: [JSON.stringify(newRecipe)],
   });
   recipe.save((err) => {
      if (err) { return res.status(500).send({ status: 'error', msg: err }); }
      const versions = recipe.versions.map(v => JSON.parse(v));
      const savedRecipe = {
         id: recipe.id,
         name: recipe.name,
         versions,
         latestVersionNumber: versions[0].version
      };
      res.send({ status: 'added', recipe: savedRecipe });
   });
});

router.get('/', (req, res) => {
   Recipe.find({}).then((recipes) => {
      recipes = recipes.map((item => {
         const versions = item.versions.map(v => JSON.parse(v));
         const latestVersionNumber = Math.max(...versions.map(v => parseInt(v.version)));
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

router.delete('/:id/:version', isLoggedIn, (req, res) => {
   const recipeId = req.params.id;
   const deleteVersion = req.params.version;

   Recipe.findOne({ id: recipeId }, (err, recipe) => {
      if (err) { return res.status(500).send({ status: 'error', msg: err }); }
      const versions = recipe.versions
         .map(v => JSON.parse(v))
         .filter(v => v.version !== deleteVersion)
         .map(v => JSON.stringify(v));

      recipe.versions = versions;

      recipe.save((err, r) => {
         if (err) { return res.status(500).send({ status: 'error', msg: err }); }
         const versions = r.versions.map(v => { return JSON.parse(v) });
         const latestVersionNumber = Math.max(...versions.map(v => parseInt(v.version)));
         const returnRecipe = {
            id: r.id,
            name: r.name,
            versions,
            latestVersionNumber
         }
         res.send({ status: 'updated', "recipe": returnRecipe });
      });

   })

})

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
      if (updatedRecipe.recipe) {
         if (updatedRecipe.update === 'new_version') {
            const versions = recipe.versions.map(v => JSON.parse(v)).map(v => parseInt(v.version));
            const latestVersion = Math.max(...versions);
            updatedRecipe.recipe.version = latestVersion + 1;
            recipe.versions.push(JSON.stringify(updatedRecipe.recipe))
         } else if (updatedRecipe.update === 'replace') {
            if (!updatedRecipe.replaceVersion) {
               return res.status(400).send({ status: 'error', msg: 'missing version to replace' });
            }
            let versions = recipe.versions.map(v => JSON.parse(v));
            const indexToReplace = versions.findIndex(v => {
               return parseInt(v.version) === parseInt(updatedRecipe.replaceVersion);
            });

            updatedRecipe.recipe.version = updatedRecipe.replaceVersion;
            versions[indexToReplace] = updatedRecipe.recipe;

            versions = versions.map(v => JSON.stringify(v));

            recipe.versions = versions;
         }

         recipe.save((err, r) => {
            if (err) { return res.status(500).send({ status: 'error', msg: err }); }
            const versions = r.versions.map(v => { return JSON.parse(v) });
            const latestVersionNumber = Math.max(...versions.map(v => parseInt(v.version)));
            const returnRecipe = {
               id: r.id,
               name: r.name,
               versions,
               latestVersionNumber
            }
            res.send({ status: 'updated', "recipe": returnRecipe });
         });
      } else {
         return res.status(400).send({ status: 'error', msg: 'No recipe found with that id' });
      }

   });
});

module.exports = router;