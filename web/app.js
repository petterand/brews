import Vue from 'vue';
import VueResource from 'vue-resource';
import router from './router';
import store from './services/Store';
import eventHub from './services/EventHub';
import TopMenu from './components/top-menu/top-menu';
import RecipeSections from './components/recipe-sections/recipe-sections'
import Dialogs from './components/dialogs/dialogs.vue';

Vue.use(VueResource);
Vue.component('top-menu', TopMenu);
Vue.component('recipe-sections', RecipeSections);

var recipes = [];

new Vue({
   el: '#app',
   router,
   store,
   components: {
      Dialogs
   },
   created() {
      store.dispatch('fetchIsAuthenticated')
         .then(store.dispatch('fetchRecipes').then((a) => {
            store.state.dataLoaded = true;
         }));

      eventHub.$on('RECIPE_ADDED', (recipe) => {
         this.recipes.push(recipe);
      });

   },
   data: {
      recipes: recipes
   }
})