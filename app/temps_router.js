const router = require('express').Router();
const Temp = require('./models/Temp');
const Batch = require('./models/Batch');


router.post('/', (req, res) => {
   Batch.findOne({
      $and: [{ fermStart: { $exists: true } }, { fermStop: { $exists: false } }],
   }).then(batch => {
      if (batch) {
         var temp = new Temp({
            temperature: req.body.Temp,
            gravity: req.body.SG,
            batch_id: batch.id
         });

         temp.save(function (err) {
            if (err) { console.log('ERR', err); res.end(); }
            res.end();
         });
      } else {
         console.log('No active batch');
         res.end();
      }
   });
});

router.get('/:batchId', (req, res) => {
   Temp.find({ batch_id: req.params.batchId }).sort({ measured_at: 1 }).exec((err, temps) => {
      if (err) { return res.status(500).send(err) }

      const returnValues = temps.map(temp => {
         return {
            measured_at: temp.measured_at,
            temperature: temp.temperature,
            gravity: temp.gravity,
            recipe_id: temp.batch_id
         }
      });

      res.status(200).send(returnValues);

   });
})

module.exports = router;
