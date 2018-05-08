import Vue from 'vue';
import template from './template.tpl.html';
import Utils from '../../services/Utils';
import store from '../../services/Store';
import router from '../../router';
import BatchService from '../../services/BatchService';
import Batch from '../../components/batch/batch';
import moment from 'moment';
import { parse } from 'url';

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

function createBatch() {
   const batch = {
      recipe_id: this.recipe.id
   }
   BatchService.createBatch(batch).then(_batch => {
      store.dispatch('addBatch', _batch);
      store.dispatch('selectBatch', _batch);
   }, err => {
      console.log('Failed to create batch', err);
   });
}

const RecipeSectionsComponent = Vue.extend({
   template,
   props: ["recipe", "editable"],
   created() {
      this.$store.dispatch('fetchRecipeBatches', this.recipe.id).then(batches => {
         this.$store.dispatch('selectBatch', batches[0]);
      });
   },
   data() {
      return {
         selectedBatch: null
      }
   },
   computed: {
      getRecipe() {
         return this.recipe.recipe;
      }
   },
   beforeDestroy() {
      this.$store.dispatch('selectBatch', null);
   },
   methods: {
      getPercent,
      getRoundedValue,
      formatMinutes,
      formatWeight,
      deleteRecipe,
      createBatch,
      formatLiquid
   }
});

export default RecipeSectionsComponent;