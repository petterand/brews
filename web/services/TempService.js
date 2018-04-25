import Vue from 'vue';

export default {
   getTemps(recipeId) {
      let url = `/api/temps/${recipeId}`;
      return Vue.http.get(url).then((response) => {
         var temps = response.body;
         return Promise.resolve(temps);
      });
   }
}