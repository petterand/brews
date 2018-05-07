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
   RECIPE_BATCHES(state, batches) {
      state.recipeBatches = batches;
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
            resolve(recipe);
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
            resolve(result.recipe);
         });
      });
   },
   fetchAllBatches({ commit }) {

   },
   fetchRecipeBatches({ commit }, recipeId) {
      return new Promise((resolve, reject) => {
         BatchService.getBatches(recipeId).then(batches => {
            commit("RECIPE_BATCHES", batches);
            resolve(batches);
         }, err => {
            reject(err);
         })
      });
   },
   selectBatch({ commit }, batch) {
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
   }
};

const getters = {
   getRecipe: (state) => (id) => {
      return state.recipes.find(item => item.id === id);
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