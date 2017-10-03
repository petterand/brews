import Vue from 'vue';

export default {
   fetchRecipes() {
      return Vue.http.get('/api/recipe').then((response) => {
         var recipes = response.body;
         return Promise.resolve(recipes);
      });
   }
}