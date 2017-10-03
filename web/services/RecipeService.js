import Vue from 'vue';

export default {
   fetchRecipes() {
      return Vue.http.get('/api/recipe').then((response) => {
         var recipes = response.body;
         return Promise.resolve(recipes);
      });
   },
   saveRecipe(recipe) {
      return Vue.http.post('/api/recipe', recipe).then((response) => {
         return Promise.resolve(recipe);
      }, (err) => {
         return Promise.reject(err);
      });
   }
}