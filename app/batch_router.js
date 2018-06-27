const router = require('express').Router();
const Batch = require('./models/Batch');

const isLoggedIn = require('./AuthHelpers').isLoggedIn;

router.post('/', isLoggedIn, (req, res) => {
   const newBatch = req.body;
   Batch.find({ recipe_id: newBatch.recipe_id }).then(batches => {
      const batchId = `${newBatch.recipe_id}_${batches.length + 1}`;
      const batch = new Batch({
         id: batchId,
         recipe_id: newBatch.recipe_id
      });
      batch.save((err) => {
         if (err) { return res.status(500).send({ status: 'error', msg: err }); }
         res.status(201).send({ status: 'added', batch: batch });
      });
   });
});

router.put('/:batchId/startFermentation', isLoggedIn, (req, res) => {
   const fermStart = new Date().getTime();
   Batch.findOneAndUpdate({ id: req.params.batchId }, { $set: { 'fermStart': fermStart } }, { new: true }, (err, batch) => {
      if (err) { return res.status(500).send({ status: 'error', msg: err }) };
      res.status(200).send({ status: 'updated', batch: batch });
   })
});

router.put('/:batchId/stopFermentation', isLoggedIn, (req, res) => {
   const fermStop = new Date().getTime();
   Batch.findOneAndUpdate({ id: req.params.batchId }, { $set: { 'fermStop': fermStop } }, { new: true }, (err, batch) => {
      if (err) { return res.status(500).send({ status: 'error', msg: err }) };
      res.status(200).send({ status: 'updated', batch: batch });
   })
});

router.put('/:batchId/measuredValues', isLoggedIn, (req, res) => {
   const updateValues = req.body;
   Batch.findOne({ id: req.params.batchId }, (err, batch) => {
      if (err) { return res.status(500).send({ status: 'error', msg: err }) };

      batch.mash_ph = updateValues.mash_ph;
      batch.boil_vol = updateValues.boil_vol;
      batch.preboil_sg = updateValues.preboil_sg;
      batch.postboil_vol = updateValues.postboil_vol;
      batch.og = updateValues.og;
      batch.boil_vol = updateValues.boil_vol;
      batch.fg = updateValues.fg;
      batch.fermentation_vol = updateValues.fermentation_vol;

      batch.save(err => {
         if (err) { return res.status(500).send({ status: 'error', msg: err }) };
         res.status(200).send({ status: 'updated', batch: batch });
      })
   })
});

router.put('/:batchId/notes', isLoggedIn, (req, res) => {
   Batch.findOneAndUpdate({ id: req.params.batchId }, { $set: { 'notes': req.body.notes } }, { new: true }, (err, batch) => {
      if (err) { return res.status(500).send({ status: 'error', msg: err }) };
      res.status(200).send({ status: 'updated', batch: batch });
   })
});

router.get('/', (req, res) => {
   Batch.find({}, { '_id': 0, '__v': 0 }).then(batches => {
      res.status(200).send(batches);
   }, err => {
      res.status(500).send(err);
   });
});

router.get('/:recipeId', (req, res) => {
   Batch.find({ recipe_id: req.params.recipeId }, { '_id': 0, '__v': 0 }).then(batches => {
      res.status(200).send(batches);
   }, err => {
      res.status(500).send(err);
   });
})

router.get('/:recipeId/:version', (req, res) => {
   Batch.find({ recipe_id: req.params.recipeId, recipe_version: req.params.version }, { '_id': 0, '__v': 0 }).then(batches => {
      res.status(200).send(batches);
   }, err => {
      res.status(500).send(err);
   });
})

module.exports = router;