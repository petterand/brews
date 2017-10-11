import Vue from 'vue';
import Vuex from 'vuex';
import RecipeService from './RecipeService';
import AuthService from './AuthService';

Vue.use(Vuex);

const state = {
   recipes: [],
   isLoggedIn: false,
   user: {},
   dataLoaded: false
};

const mutations = {
   addRecipes(state, recipes) {
      state.recipes = state.recipes.concat(recipes);
   },
   addRecipe(state, recipe) {
      state.recipes.push(recipe);
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
         RecipeService.saveRecipe(recipe).then(() => {
            commit('addRecipe', recipe);
            resolve(recipe);
         }, (err) => {
            reject(err);
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