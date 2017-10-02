import Vue from 'vue';
import template from './template.tpl.html';

const RecipeDetails = Vue.extend({
   template,
   props: ['id'],
   data: function () {
      return { currentRecipe: this.$store.getters.getRecipe(this.id) || {} }
   },
   watch: {
      id: function (val) {
         this.currentRecipe = this.$store.getters.getRecipe(val);
      }
   }
});

export default RecipeDetails;