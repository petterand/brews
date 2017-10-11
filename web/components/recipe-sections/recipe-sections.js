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

const RecipeSectionsComponent = Vue.extend({
   template,
   props: ["recipe", "editable"],
   methods: {
      getPercent: getPercent,
      getRoundedValue: getRoundedValue
   },
   data: function () {
      return {
         fermentationStepNames: ['Primär', 'Sekundär']
      }
   }
});

export default RecipeSectionsComponent;