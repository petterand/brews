const router = require('express').Router();
const Temp = require('./models/Temp');
const Recipe = require('./models/Recipe');


router.post('/', (req, res) => {
   Recipe.findOne({
      $and: [{ fermStart: { $exists: true } }, { fermStop: { $exists: false } }],
   }).then(recipe => {
      if (recipe) {
         var t = req.body.temp;
         var temp = new Temp({
            temperature: t
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

module.exports = router;
