
import { parseString } from 'xml2js';
import Q from 'q';

function parse(xml) {
   var defer = Q.defer();
   parseString(xml, (err, result) => {
      defer.resolve(formatJson(result));
   });
   return defer.promise;
}

function formatJson(json) {
   var root = json.RECIPES.RECIPE[0];

   var resultObject = {};
   resultObject.name = root.NAME[0];
   resultObject.version = root.VERSION[0];
   resultObject.date = new Date(root.DATE[0]).getTime();
   resultObject.type = root.TYPE[0];
   resultObject.brewer = root.BREWER[0];
   resultObject.batchSize = root.BATCH_SIZE[0];
   resultObject.boilSize = root.BOIL_SIZE[0];
   resultObject.boilTime = root.BOIL_TIME[0];
   resultObject.efficiency = root.EFFICIENCY[0];
   resultObject.estOG = root.EST_OG[0];
   resultObject.estFG = root.EST_FG[0];
   resultObject.ibu = root.IBU[0];
   resultObject.estAbv = root.EST_ABV[0];
   resultObject.calories = root.CALORIES[0];
   resultObject.estColor = root.EST_COLOR[0];
   resultObject.notes = root.NOTES[0];
   resultObject.ibuMethod = root.IBU_METHOD[0];
   resultObject.waters = root.WATERS[0];
   resultObject.fermentationStages = root.FERMENTATION_STAGES[0]
   resultObject.primaryAge = root.PRIMARY_AGE[0];
   resultObject.primaryTemp = root.PRIMARY_TEMP[0];
   resultObject.mashSteps = getMashSteps(root.MASH[0].MASH_STEPS);
   resultObject.fermentables = getFermentables(root.FERMENTABLES[0].FERMENTABLE);
   resultObject.hops = getHops(root.HOPS[0].HOP);
   resultObject.yeasts = getYeasts(root.YEASTS[0].YEAST);
   resultObject.miscs = getMiscs(root.MISCS[0].MISC);

   return resultObject;
}

function getMashSteps(json) {
   var mashSteps = [];

   json.forEach((step) => {
      step = step.MASH_STEP[0];
      mashSteps.push({
         name: step.NAME[0],
         version: step.VERSION[0],
         type: step.TYPE[0],
         infuseAmount: step.INFUSE_AMOUNT[0],
         stepTime: step.STEP_TIME[0],
         stepTemp: step.STEP_TEMP[0],
         rampTime: step.RAMP_TIME[0],
         endTime: step.END_TEMP[0]
      });
   });
   return mashSteps;
}

function getFermentables(json) {
   var fermentables = [];

   json.forEach((fermentable) => {
      fermentables.push({
         name: fermentable.NAME[0],
         version: fermentable.VERSION[0],
         type: fermentable.TYPE[0],
         amount: fermentable.AMOUNT[0],
         yield: fermentable.YIELD[0],
         color: fermentable.COLOR[0]
      })
   });
   return fermentables;
}

function getHops(json) {
   var hops = [];
   json.forEach((hop) => {
      hops.push({
         name: hop.NAME[0],
         version: hop.VERSION[0],
         alpha: hop.ALPHA[0],
         amount: hop.AMOUNT[0],
         use: hop.USE[0],
         time: parseInt(hop.TIME[0]),
         form: hop.FORM[0]
      })
   });
   return hops;
}

function getYeasts(json) {
   var yeasts = [];
   json.forEach((yeast) => {
      yeasts.push({
         name: yeast.NAME[0],
         version: yeast.VERSION[0],
         type: yeast.TYPE[0],
         form: yeast.FORM[0],
         amount: yeast.AMOUNT[0],
         amountIsWeight: yeast.AMOUNT_IS_WEIGHT[0],
         attenuation: yeast.ATTENUATION[0],
         laboration: yeast.LABORATORY[0],
         productId: yeast.PRODUCT_ID[0]
      })
   });
   return yeasts;
}

function getMiscs(json) {
   var miscs = [];
   json.forEach((misc) => {
      miscs.push({
         name: misc.NAME[0],
         version: misc.VERSION[0],
         amount: misc.AMOUNT[0],
         amountIsWeight: misc.AMOUNT_IS_WEIGHT[0],
         time: misc.TIME[0],
         type: misc.TYPE[0],
         use: misc.USE[0]
      });
   });
   return miscs;
}

const BeerXmlService = {
   parse: parse
};

export default BeerXmlService;