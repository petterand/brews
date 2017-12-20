import Vue from 'vue';

export default {
   getTemp(from, to) {
      let url = '/api2/temp?dateFrom=' + from;
      if (to) {
         url += '&dateTo=' + to;
      }
      return Vue.http.get(url).then((response) => {
         var temps = response.body;
         return Promise.resolve(temps.data);
      });
   }
}