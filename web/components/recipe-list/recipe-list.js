import Vue from 'vue';
import template from './template.tpl.html';
import eventHub from '../../services/EventHub';
import RecipeListItem from './recipe-list-item/recipe-list-item';

var RecipeList = Vue.extend({
    template,
    components: {
        "recipe-list-item": RecipeListItem
    },
    data: function () {
        return {

        }
    }
})

export default RecipeList;