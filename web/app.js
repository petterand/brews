import Vue from 'vue';
import VueResource from 'vue-resource';
import router from './router';
import store from './services/Store';
import eventHub from './services/EventHub';
import TopMenu from './components/top-menu/top-menu';
import RecipeSections from './components/recipe-sections/recipe-sections'

Vue.use(VueResource);
Vue.component('top-menu', TopMenu);
Vue.component('recipe-sections', RecipeSections);

var recipes = [];

new Vue({
    el: '#app',
    router,
    store,
    created() {
        store.dispatch('fetchRecipes');

        eventHub.$on('RECIPE_ADDED', (recipe) => {
            this.recipes.push(recipe);
        });

    },
    data: {
        recipes: recipes
    }
})