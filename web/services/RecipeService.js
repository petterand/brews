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
         if (response.body.status === 'added') {
            return Promise.resolve(response.body.recipe);
         } else {
            return Promise.reject();
         }
      }, (err) => {
         return Promise.reject(err);
      });
   }
}