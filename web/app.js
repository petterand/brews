import Vue from 'vue';
import VueResource from 'vue-resource';
import router from './router';
import store from './services/Store';
import eventHub from './services/EventHub';
import BrewsComponent from './components/brews-component/brews-component';
import AddBrewsComponent from './components/add-brew/add-brew';
import RecipeDetails from './components/recipe-details/recipe-details';

Vue.use(VueResource);
Vue.component('brews', BrewsComponent);
Vue.component('add-brew', AddBrewsComponent);
Vue.component('recipe-details', RecipeDetails);

var recipes = [];

new Vue({
    el: '#app',
    router,
    store,
    created() {
        store.dispatch('fetchRecipes');

        eventHub.$on('RECIPE_ADDED', (recipe) => {
            this.$http.post('/api/recipe', recipe).then((response) => {
                this.recipes.push(recipe);
            }, (err) => {
                alert('FAILED TO ADD RECIPE');
            });
        });

    },
    data: {
        recipes: recipes
    }
})