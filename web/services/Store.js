import Vue from 'vue';
import Vuex from 'vuex';
import RecipeService from './RecipeService';

Vue.use(Vuex);

const state = {
   recipes: []
};

const mutations = {
   addRecipes(state, recipes) {
      state.recipes = state.recipes.concat(recipes);
   },
   addRecipe(state, recipe) {
      state.recipes.push(recipe);
   }
}

const actions = {
   fetchRecipes({ commit }) {
      RecipeService.fetchRecipes().then((recipes) => {
         commit('addRecipes', recipes);
      });
   },
   saveRecipe({ commit }, recipe) {
      return new Promise((resolve, reject) => {
         RecipeService.saveRecipe(recipe).then(() => {
            commit('addRecipe', recipe);
            resolve(recipe);
         }, (err) => {
            reject(err);
         });

      });
   }
};

const getters = {
   getRecipe: (state) => (id) => {
      return state.recipes.find(item => item.id === id);
   }
}

export default new Vuex.Store({
   state,
   getters,
   actions,
   mutations
});