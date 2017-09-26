import Vue from 'vue';
import template from './template.tpl.html';
import eventHub from '../../services/EventHub';


var BrewsComponent = Vue.extend({
    template,
    props: ['brews'],
    created() {
        eventHub.$on('RECIPE_ADDED', function (recipe) {
            this.brews.push(recipe);
        });
    },

    data: function () {
        return {}
    }
})

export default BrewsComponent;