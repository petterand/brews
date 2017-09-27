
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
    resultObject.name = root.NAME ? root.NAME[0] : '';
    resultObject.version = root.VERSION ? root.VERSION[0] : '';
    resultObject.date = root.DATE ? new Date(root.DATE[0]).getTime() : '';
    resultObject.type = root.TYPE ? root.TYPE[0] : '';
    resultObject.brewer = root.BREWER ? root.BREWER[0] : '';
    resultObject.batchSize = root.BATCH_SIZE ? root.BATCH_SIZE[0] : '';
    resultObject.boilSize = root.BOIL_SIZE ? root.BOIL_SIZE[0] : '';
    resultObject.boilTime = root.BOIL_TIME ? root.BOIL_TIME[0] : '';
    resultObject.efficiency = root.EFFICIENCY ? root.EFFICIENCY[0] : '';
    resultObject.estOG = root.EST_OG ? root.EST_OG[0] : '';
    resultObject.estFG = root.EST_FG ? root.EST_FG[0] : '';
    resultObject.ibu = root.IBU ? root.IBU[0] : '';
    resultObject.estAbv = root.EST_ABV ? root.EST_ABV[0] : '';
    resultObject.calories = root.CALORIES ? root.CALORIES[0] : '';
    resultObject.estColor = root.EST_COLOR ? root.EST_COLOR[0] : '';
    resultObject.notes = root.NOTES ? root.NOTES[0] : '';
    resultObject.ibuMethod = root.IBU_METHOD ? root.IBU_METHOD[0] : '';
    resultObject.waters = root.WATERS ? root.WATERS[0] : '';
    resultObject.fermentationStages = root.FERMENTATION_STAGES ? root.FERMENTATION_STAGES[0] : '';
    resultObject.primaryAge = root.PRIMARY_AGE ? root.PRIMARY_AGE[0] : '';
    resultObject.primaryTemp = root.PRIMARY_TEMP ? root.PRIMARY_TEMP[0] : '';
    resultObject.mashSteps = getMashSteps(root.MASH ? root.MASH[0].MASH_STEPS[0].MASH_STEP : []);
    resultObject.fermentables = getFermentables(root.FERMENTABLES ? root.FERMENTABLES[0].FERMENTABLE : []);
    resultObject.hops = getHops(root.HOPS ? root.HOPS[0].HOP : []);
    resultObject.yeasts = getYeasts(root.YEASTS ? root.YEASTS[0].YEAST : []);
    if (root.MISCS && root.MISCS[0].trim()) {
        resultObject.miscs = getMiscs(root.MISCS[0].MISC);
    }

    return resultObject;
}

function getMashSteps(json) {
    var mashSteps = [];

    json.forEach((step) => {
        mashSteps.push({
            name: step.NAME ? step.NAME[0] : '',
            version: step.VERSION ? step.VERSION[0] : '',
            type: step.TYPE ? step.TYPE[0] : '',
            infuseAmount: step.INFUSE_AMOUNT ? step.INFUSE_AMOUNT[0] : '',
            stepTime: step.STEP_TIME ? step.STEP_TIME[0] : '',
            stepTemp: step.STEP_TEMP ? step.STEP_TEMP[0] : '',
            rampTime: step.RAMP_TIME ? step.RAMP_TIME[0] : '',
            endTime: step.END_TEMP ? step.END_TEMP[0] : ''
        });
    });
    return mashSteps;
}

function getFermentables(json) {
    var fermentables = [];

    json.forEach((fermentable) => {
        fermentables.push({
            name: fermentable.NAME ? fermentable.NAME[0] : '',
            version: fermentable.VERSION ? fermentable.VERSION[0] : '',
            type: fermentable.TYPE ? fermentable.TYPE[0] : '',
            amount: fermentable.AMOUNT ? fermentable.AMOUNT[0] : '',
            yield: fermentable.YIELD ? fermentable.YIELD[0] : '',
            color: fermentable.COLOR ? fermentable.COLOR[0] : ''
        })
    });
    return fermentables;
}

function getHops(json) {
    var hops = [];
    json.forEach((hop) => {
        hops.push({
            name: hop.NAME ? hop.NAME[0] : '',
            version: hop.VERSION ? hop.VERSION[0] : '',
            alpha: hop.ALPHA ? hop.ALPHA[0] : '',
            amount: hop.AMOUNT ? hop.AMOUNT[0] : '',
            use: hop.USE ? hop.USE[0] : '',
            time: parseInt(hop.TIME ? hop.TIME[0] : ''),
            form: hop.FORM ? hop.FORM[0] : ''
        })
    });
    return hops;
}

function getYeasts(json) {
    var yeasts = [];
    json.forEach((yeast) => {
        yeasts.push({
            name: yeast.NAME ? yeast.NAME[0] : '',
            version: yeast.VERSION ? yeast.VERSION[0] : '',
            type: yeast.TYPE ? yeast.TYPE[0] : '',
            form: yeast.FORM ? yeast.FORM[0] : '',
            amount: yeast.AMOUNT ? yeast.AMOUNT[0] : '',
            amountIsWeight: yeast.AMOUNT_IS_WEIGHT ? yeast.AMOUNT_IS_WEIGHT[0] : '',
            attenuation: yeast.ATTENUATION ? yeast.ATTENUATION[0] : '',
            laboration: yeast.LABORATORY ? yeast.LABORATORY[0] : '',
            productId: yeast.PRODUCT_ID ? yeast.PRODUCT_ID[0] : ''
        })
    });
    return yeasts;
}

function getMiscs(json) {
    var miscs = [];
    json.forEach((misc) => {
        miscs.push({
            name: misc.NAME ? misc.NAME[0] : '',
            version: misc.VERSION ? misc.VERSION[0] : '',
            amount: misc.AMOUNT ? misc.AMOUNT[0] : '',
            amountIsWeight: misc.AMOUNT_IS_WEIGHT ? misc.AMOUNT_IS_WEIGHT[0] : '',
            time: misc.TIME ? misc.TIME[0] : '',
            type: misc.TYPE ? misc.TYPE[0] : '',
            use: misc.USE ? misc.USE[0] : ''
        });
    });
    return miscs;
}

const BeerXmlService = {
    parse: parse
};

export default BeerXmlService;