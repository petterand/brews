import Vue from 'vue';
import template from './template.tpl.html';
import Utils from '../../../services/Utils';

var RecipeListItem = Vue.extend({
   template,
   props: ['recipe'],
   computed: {
      beerColor: function () {
         return { "background-color": Utils.srmToHex(this.recipe.recipe.estColor) };
      }
   }
})

export default RecipeListItem;