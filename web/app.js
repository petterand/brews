import Vue from 'vue';
import VueResource from 'vue-resource';
import BrewsComponent from './components/brews-component/brews-component';
import AddBrewsComponent from './components/add-brew/add-brew';

Vue.use(VueResource);
Vue.component('brews', BrewsComponent);
Vue.component('add-brew', AddBrewsComponent);

var recipes = [];

new Vue({
    el: '#app',
    created() {
        this.$http.get('/api/recipes').then((response) => {
            console.log(response.body);
            this.recipes = response.body;
        });
    },
    data: {
        recipes: recipes
    }
})