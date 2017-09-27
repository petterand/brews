import Vue from 'vue';
import VueResource from 'vue-resource';
import eventHub from './services/EventHub';
import BrewsComponent from './components/brews-component/brews-component';
import AddBrewsComponent from './components/add-brew/add-brew';

Vue.use(VueResource);
Vue.component('brews', BrewsComponent);
Vue.component('add-brew', AddBrewsComponent);

var recipes = [];

new Vue({
    el: '#app',
    created() {
        this.$http.get('/api/recipe').then((response) => {
            console.log(response.body);
            this.recipes = response.body;
        });

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