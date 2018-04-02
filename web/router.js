import VueRouter from 'vue-router';
import Vue from 'vue';
import store from './services/Store';

import RecipeList from './components/recipe-list/recipe-list';
import RecipeDetails from './components/recipe-details/recipe-details';
import addBrew from './components/add-brew/add-brew';
import fourOFour from './components/404/404';
import co2 from './components/co2/co2.vue';
import rehydrating from './components/rehydrating/rehydrating.vue';
import waterTreatment from './components/water-treatment/water-treatment.vue';

Vue.use(VueRouter);

function waitForData(to, from, next) {
   if (store.state.dataLoaded === false) {
      store.watch(
         (state) => state.dataLoaded,
         (value) => {
            if (value === true) {
               next();
            }
         }
      )
   } else {
      next();
   }
}

const routes = [
   { path: '/', component: RecipeList, beforeEnter: waitForData },
   { path: '/recipe/:id', component: RecipeDetails, props: true, beforeEnter: waitForData },
   { path: '/add', component: addBrew },
   { path: '/co2', component: co2 },
   { path: '/rehydrating', component: rehydrating },
   { path: '/waterTreatment', component: waterTreatment },
   { path: '/404', component: fourOFour }
];

export default new VueRouter({
   routes
});