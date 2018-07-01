import Vue from 'vue';
import template from './template.tpl.html';
import RecipeListItem from './recipe-list-item/recipe-list-item';

var RecipeList = Vue.extend({
   template,
   components: {
      "recipe-list-item": RecipeListItem
   },
   data() {
      return {

      }
   }
})

export default RecipeList;