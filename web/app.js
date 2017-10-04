import Vue from 'vue';
import VueResource from 'vue-resource';
import router from './router';
import store from './services/Store';
import eventHub from './services/EventHub';
import TopMenu from './components/top-menu/top-menu';

Vue.use(VueResource);
Vue.component('top-menu', TopMenu)
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