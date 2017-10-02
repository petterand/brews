import Vue from 'vue';

export default {
   fetchRecipes() {
      return Vue.http.get('/api/recipe').then((response) => {
         var recipes = response.body.map((item => {
            return {
               name: item.name,
               id: item.name.replace(/\s/g, '_').toLowerCase(),
               recipe: JSON.parse(item.recipe)
            }
         }));
         return Promise.resolve(recipes);
      });
   }
}