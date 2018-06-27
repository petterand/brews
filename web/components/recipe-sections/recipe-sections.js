import Vue from 'vue';
import template from './template.tpl.html';
import Utils from '../../services/Utils';
import store from '../../services/Store';
import router from '../../router';
import BatchService from '../../services/BatchService';
import Batch from '../../components/batch/batch';
import SelectBox from '../../components/select/selectbox.vue';
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
      weight = getRoundedValue(Utils.kgToGram(weight)) + 'g';
   } else {
      weight = weight + 'kg';
   }

   return weight;
}

function formatLiquid(amount) {
   return Utils.litreToMl(getRoundedValue(amount, -3));
}

function deleteRecipe() {
   store.dispatch('removeRecipe', store.state.selectedRecipe).then(() => {
      router.push('/');
   });
}

function editRecipe() {
   const editDialog = document.querySelector('#editRecipeDialog');
   editDialog.showModal();
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

function onChangeBatch(e) {
   store.dispatch('selectBatchById', e.target.value);
}

function selectVersionAndFetchBatches() {
   store.dispatch('selectRecipeVersion', store.getters.getLatestVersion);
   store.dispatch('fetchRecipeBatches', store.state.selectedRecipe.id).then(batches => {
      store.dispatch('selectBatch', batches[0]);
   });
}

const RecipeSectionsComponent = Vue.extend({
   template,
   props: ["editable", "recipe"],
   created() {
      if (!this.$store.state.selectedRecipeVersion) {
         selectVersionAndFetchBatches()
      }
   },
   data() {
      return {
         selectedBatch: null,
         selectedVersion: this.recipe.latestVersionNumber
      }
   },
   computed: {
      getRecipe() {
         return this.recipe.versions.find(v => parseInt(v.version) === parseInt(this.selectedVersion));
      }
   },
   beforeDestroy() {
      this.$store.dispatch('selectBatch', null);
      this.$store.commit('SELECT_RECIPE', null);
      this.$store.commit('SELECT_RECIPE_VERSION', null);
   },
   components: {
      SelectBox
   },
   watch: {
      recipe(val) {
         selectVersionAndFetchBatches();
      }
   },
   methods: {
      getPercent,
      getRoundedValue,
      formatMinutes,
      formatWeight,
      deleteRecipe,
      editRecipe,
      createBatch,
      formatLiquid,
      onChangeBatch
   }
});

export default RecipeSectionsComponent;