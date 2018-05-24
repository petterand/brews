import Vue from 'vue';
import template from './template.tpl.html';

const RecipeDetails = Vue.extend({
   template,
   props: ['id'],
   created() {
      this.$store.dispatch('selectRecipe', this.$store.getters.getRecipe(this.id));
   },
   watch: {
      id: function (val) {
         this.$store.dispatch('selectRecipe', this.$store.getters.getRecipe(val));
      }
   }
});

export default RecipeDetails;