import Vue from 'vue';
import template from './template.tpl.html';
import store from '../../services/Store';
import eventHub from '../../services/EventHub';
import Utils from '../../services/Utils';
import RecipeService from '../../services/RecipeService';
import router from '../../router';
import FileDropArea from '../file-drop-area/FileDropArea.vue';


const AddBrewComponent = Vue.extend({
   template,
   components: {
      FileDropArea
   },
   methods: {
      saveRecipe: saveRecipe,
      onFileParsed(recipe) {
         this.recipe = {
            recipe
         }
      }
   },
   data: function () {
      return {
         recipe: null
      }
   },
   beforeRouteEnter(to, from, next) {
      if (!store.state.isLoggedIn) {
         next('/404');
      } else {
         next();
      }
   }
});

export default AddBrewComponent;

function saveRecipe() {
   store.dispatch('saveRecipe', this.recipe.recipe).then((recipe) => {
      this.$router.push('/');
   });
}