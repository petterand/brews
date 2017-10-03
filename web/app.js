import Vue from 'vue';
import VueResource from 'vue-resource';
import router from './router';
import store from './services/Store';
import eventHub from './services/EventHub';

Vue.use(VueResource);

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