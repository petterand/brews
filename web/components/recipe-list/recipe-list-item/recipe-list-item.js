import Vue from 'vue';
import template from './template.tpl.html';
import Utils from '../../../services/Utils';

var RecipeListItem = Vue.extend({
   template,
   props: ['recipe'],
   computed: {
      beerColor() {
         return { "background-color": Utils.srmToHex(this.latestRecipe.estColor) };
      },
      latestRecipe() {
         const versionNumber = this.recipe.latestVersionNumber
         const recipe = this.recipe.versions.find(r => {
            return parseInt(r.version) === versionNumber;
         });

         return recipe;
      }
   }
})

export default RecipeListItem;