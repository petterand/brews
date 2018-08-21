import Vue from 'vue';
import Vuex from 'vuex';
import RecipeService from './RecipeService';
import AuthService from './AuthService';
import BatchService from './BatchService';

Vue.use(Vuex);

const state = {
   recipes: [],
   isLoggedIn: false,
   user: {},
   dataLoaded: false,
   selectedRecipe: null,
   selectedRecipeVersion: null,
   selectedBatch: null,
   recipeBatches: []
};

const mutations = {
   addRecipes(state, recipes) {
      state.recipes = state.recipes.concat(recipes);
   },
   addRecipe(state, recipe) {
      state.recipes = [...state.recipes, recipe];
   },
   removeRecipe(state, recipe) {
      state.recipes = state.recipes.filter((r) => {
         return r.id !== recipe.id;
      });
   },
   LOGIN_SUCCESS(state, user) {
      state.isLoggedIn = true;
      state.user = user;
   },
   LOGOUT(state) {
      state.isLoggedIn = false;
      state.user = {};
   },
   IS_AUTHENTICATED(state, result) {
      state.isLoggedIn = result.isAuthenticated;
      if (result.user) {
         state.user = result.user;
      }
   },
   RECIPE_UPDATED(state, recipe) {
      var index = state.recipes.map(r => r.id).indexOf(recipe.id);
      Vue.set(state.recipes, index, recipe);
   },
   SELECT_RECIPE(state, recipe) {
      Vue.set(state, 'selectedRecipe', recipe)
   },
   SELECT_RECIPE_VERSION(state, version) {
      state.selectedRecipeVersion = version;
   },
   RECIPE_BATCHES(state, batches) {
      state.recipeBatches = batches;
   },
   ADD_BATCH(state, batch) {
      state.recipeBatches = [...state.recipeBatches, batch];
   },
   SELECT_BATCH(state, batch) {
      state.selectedBatch = batch;
   },
   UPDATE_BATCH(state, batch) {
      var index = state.recipeBatches.map(b => b.id).indexOf(batch.id);
      Vue.set(state.recipeBatches, index, batch);
   }
}

const actions = {
   fetchRecipes({ commit }) {
      return new Promise((resolve, reject) => {
         RecipeService.fetchRecipes().then((recipes) => {
            commit('addRecipes', recipes);
            resolve(recipes);
         });
      });
   },
   saveRecipe({ commit }, recipe) {
      return new Promise((resolve, reject) => {
         RecipeService.saveRecipe(recipe).then((response) => {
            commit('addRecipe', response);
            resolve(response);
         }, (err) => {
            reject(err);
         });

      });
   },
   removeRecipe({ commit }, recipe) {
      return new Promise((resolve, reject) => {
         RecipeService.deleteRecipe(recipe.id).then(() => {
            commit('removeRecipe', recipe);
            resolve();
         }, (err) => {
            reject();
         });
      });
   },
   login({ commit }, creds) {
      return new Promise((resolve, reject) => {
         AuthService.authenticate(creds).then((user) => {
            commit('LOGIN_SUCCESS', user);
            resolve();
         }, (err) => {
            reject();
         });
      })
   },
   logout({ commit }) {
      return new Promise((resolve, reject) => {
         AuthService.logout().then(() => {
            commit("LOGOUT");
            resolve();
         });
      });
   },
   fetchIsAuthenticated({ commit }) {
      return new Promise((resolve, reject) => {
         AuthService.isAuthenticated().then((result) => {
            commit("IS_AUTHENTICATED", result);
            resolve(result.isAuthenticated);
         });
      });
   },
   updateRecipe({ commit }, recipe) {
      return new Promise((resolve, reject) => {
         RecipeService.updateRecipe(recipe.id, recipe).then((result) => {
            commit("RECIPE_UPDATED", result);
            resolve(result);
         });
      });
   },
   selectRecipe({ commit }, recipe) {
      commit("SELECT_RECIPE", recipe);
   },
   selectRecipeVersion({ commit }, version) {
      commit("SELECT_RECIPE_VERSION", version);
   },
   fetchAllBatches({ commit }) {

   },
   fetchRecipeBatches({ commit, state }) {
      return new Promise((resolve, reject) => {
         const recipeId = state.selectedRecipe.id;
         const recipeVersion = state.selectedRecipeVersion.version;

         BatchService.getBatches(recipeId, recipeVersion).then(batches => {
            commit("RECIPE_BATCHES", batches);
            resolve(batches);
         }, err => {
            reject(err);
         })
      });
   },
   addBatch({ commit }, batch) {
      commit('ADD_BATCH', batch);
   },
   selectBatch({ commit }, batch) {
      commit("SELECT_BATCH", batch);
   },
   selectBatchById({ commit, state }, batchId) {
      const batch = state.recipeBatches.find(b => b.id === batchId);
      commit("SELECT_BATCH", batch);
   },
   startFermentation({ commit, state }) {
      BatchService.startFermentation(state.selectedBatch.id).then((batch) => {
         commit("UPDATE_BATCH", batch);
         commit("SELECT_BATCH", batch);
      });
   },
   stopFermentation({ commit, state }) {
      BatchService.stopFermentation(state.selectedBatch.id).then((batch) => {
         commit("UPDATE_BATCH", batch);
         commit("SELECT_BATCH", batch);
      });
   },
   saveMeasuredvalues({ commit, state }, values) {
      BatchService.saveMeasuredvalues(state.selectedBatch.id, values).then(batch => {
         commit("UPDATE_BATCH", batch);
         commit("SELECT_BATCH", batch);
      });
   },
   saveBatchNotes({ commit, state }, notes) {
      BatchService.saveNotes(state.selectedBatch.id, notes).then(batch => {
         commit("UPDATE_BATCH", batch);
         commit("SELECT_BATCH", batch);
      });
   },
   saveBrewfatherId({ commit, state }, brewfatherId) {
      BatchService.saveBrewfatherId(state.selectedBatch.id, brewfatherId).then(batch => {
         commit("UPDATE_BATCH", batch);
         commit("SELECT_BATCH", batch);
      });
   },
   addRecipeVersion({ commit, state }, recipe) {
      const recipeDetails = {
         update: 'new_version',
         recipe
      }
      return new Promise((resolve, reject) => {
         RecipeService.updateRecipe(state.selectedRecipe.id, recipeDetails).then(updatedRecipe => {
            commit("RECIPE_UPDATED", updatedRecipe);
            commit("SELECT_RECIPE", updatedRecipe);
            resolve(updatedRecipe);
         });
      });
   },
   replaceRecipeVersion({ commit, state }, dispatchObject) {
      const recipeDetails = {
         update: 'replace',
         recipe: dispatchObject.recipe,
         replaceVersion: dispatchObject.version
      };
      return new Promise((resolve, reject) => {
         RecipeService.updateRecipe(state.selectedRecipe.id, recipeDetails).then(updatedRecipe => {
            commit("RECIPE_UPDATED", updatedRecipe);
            commit("SELECT_RECIPE", updatedRecipe);
            resolve(updatedRecipe);
         });
      });
   }

};

const getters = {
   getRecipe: (state) => (id) => {
      return state.recipes.find(item => item.id === id);
   },
   getLatestVersion: (state) => {
      const versionNumber = state.selectedRecipe.latestVersionNumber
      return state.selectedRecipe.versions.find(r => {
         return parseInt(r.version) === versionNumber;
      });
   },
   isLoggedIn: (state) => {
      return state.isLoggedIn;
   }
}

export default new Vuex.Store({
   state,
   getters,
   actions,
   mutations
});