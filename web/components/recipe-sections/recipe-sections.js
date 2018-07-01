import Vue from 'vue';
import template from './template.tpl.html';
import Utils from '../../services/Utils';
import store from '../../services/Store';
import router from '../../router';
import BatchService from '../../services/BatchService';
import EventHub from '../../services/EventHub';
import SelectBox from '../../components/select/selectbox.vue';

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
      recipe_id: this.recipe.id,
      recipe_version: this.selectedVersion
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

function selectVersionAndFetchBatches(version) {
   var recipeVersion = store.getters.getLatestVersion
   if (version) {
      recipeVersion = store.state.selectedRecipe.versions.find(v => v.version === version) || recipeVersion;
   }

   store.dispatch('selectRecipeVersion', recipeVersion);
   store.dispatch('fetchRecipeBatches').then(batches => {
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
      EventHub.$on('VERSION_ADDED', function () {
         this.selectedVersion = this.recipe.latestVersionNumber;
      }.bind(this));
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
      },
      selectedVersion(version) {
         if (version !== this.$store.state.selectedRecipeVersion.version) {
            selectVersionAndFetchBatches(version);
         }
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