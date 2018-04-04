import Vue from 'vue';
import template from './template.tpl.html';
import Utils from '../../services/Utils';
import store from '../../services/Store';
import router from '../../router';
import TempService from '../../services/TempService';

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

   exp = exp !== undefined ? exp : -2;

   value = Utils.round10(value, exp);

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

function formatLiquid(amount) {
   return `${getRoundedValue(amount, -3)}L`;
}

function deleteRecipe() {
   store.dispatch('removeRecipe', this.recipe).then(() => {
      router.push('/');
   });
}

function startFermentation() {
   this.recipe.fermStart = (new Date()).getTime();
   store.dispatch('updateRecipe', this.recipe).then(() => {

   });
}

function stopFermentation() {
   this.recipe.fermStop = (new Date()).getTime();
   store.dispatch('updateRecipe', this.recipe).then(() => {

   });
}

function getTemps(recipe) {
   return new Promise((resolve, reject) => {
      if (recipe.fermStart) {
         TempService.getTemp(recipe.fermStart, recipe.fermEnd).then((temps) => {
            resolve(temps);
         });
      } else {
         resolve([]);
      }
   });
}

const RecipeSectionsComponent = Vue.extend({
   template,
   props: ["recipe", "editable"],
   data() {
      return {
         temps: []
      }
   },
   created() {
      getTemps(this.recipe).then(function (temps) {
         this.temps = temps;
      }.bind(this));
   },
   computed: {
      getRecipe() {
         return this.recipe.recipe;
      },
      getLatestTemperature() {
         let temp = this.temps.length > 0 ? this.temps[this.temps.length - 1].temperature : null;

         return temp;
      }
   },
   methods: {
      getPercent,
      getRoundedValue,
      formatMinutes,
      formatWeight,
      deleteRecipe,
      startFermentation,
      stopFermentation,
      formatLiquid
   }
});

export default RecipeSectionsComponent;