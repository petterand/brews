const router = require('express').Router();
const Temp = require('./models/Temp');
const Batch = require('./models/Batch');
const Request = require('request-promise');

function getExcelFromJsDate(timestamp) {
   return (timestamp / (86400 * 1000)) + (25567 + 2);
}

function getJsDateFromExcel(excelDate) {
   return new Date(Math.round((excelDate - (25567 + 2)) * 86400) * 1000).getTime();
}

function celsiusToFahrenheit(c) {
   return Math.round(c * 9 / 5 + 32);
}

function postToBrewfather(celsiusTemp, gravity, beername) {
   const url = 'http://log.brewfather.net/tilt?id=UAyOtxcHK618Hh';

   const excelTime = getExcelFromJsDate(Date.now());
   const fahrenheitTemp = celsiusToFahrenheit(celsiusTemp);

   const data = {
      SG: `${gravity}`,
      Temp: `${fahrenheitTemp}`, // in fahrenheit
      Color: 'RED', // valid tilt color
      Timepoint: `${excelTime}`, // excel format
      Beer: `${beername}`, // batch number
      Comment: ''
   }

   const options = {
      method: 'POST',
      uri: url,
      body:  data,
      json: true
   };

   Request(options).then((body) => {
      console.log('Data sent to brewfather', data, body);
   }).catch((e) => {
      console.log('Failed to send data to brewfather', e);
   });
}

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

         postToBrewfather(req.body.Temp, req.body.SG, batch.brewfatherId);

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
