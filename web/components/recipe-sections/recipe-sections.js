import Vue from 'vue';
import template from './template.tpl.html';
import Utils from '../../services/Utils';

function getPercent(fermentable, allFermentables) {
   var totalWeight = 0;
   allFermentables.forEach((f) => {
      totalWeight += parseFloat(f.amount);
   });
   var percent = (parseFloat(fermentable.amount) / totalWeight) * 100;
   return percent;
}

function getRoundedValue(value, exp) {
   if (typeof value === 'string') {
      value = parseFloat(value);
   }
   if (value < 1) { //round to two decimals
      value = Utils.round10(value, -2);
   } else {
      value = Math.round(value);
   }
   return value;
}

function formatMinutes(minutes) {
   const MIN_PER_DAY = 60 * 24;

   if (minutes > MIN_PER_DAY) {
      minutes = Utils.minutesToDays(minutes) + ' dagar';
   } else {
      minutes = minutes + ' min';
   }
   return minutes;
}

function formatWeight(weight) {
   if (weight < 1) {
      weight = Utils.kgToGram(weight) + ' g';
   } else {
      weight = weight + ' kg';
   }

   return weight;
}

const RecipeSectionsComponent = Vue.extend({
   template,
   props: ["recipe", "editable"],
   methods: {
      getPercent: getPercent,
      getRoundedValue: getRoundedValue,
      formatMinutes: formatMinutes,
      formatWeight: formatWeight
   }
});

export default RecipeSectionsComponent;