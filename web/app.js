import Vue from 'vue';
import BrewsComponent from './components/brews-component/brews-component';
import AddBrewsComponent from './components/add-brew/add-brew';

Vue.component('brews', BrewsComponent);
Vue.component('add-brew', AddBrewsComponent);
new Vue({
    el: '#app',
})