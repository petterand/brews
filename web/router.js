import VueRouter from 'vue-router';
import Vue from 'vue';
import store from './services/Store';

import BrewsComponent from './components/brews-component/brews-component';
import RecipeDetails from './components/recipe-details/recipe-details';

Vue.use(VueRouter);

function waitForData(to, from, next) {
   function proceed() {
      if (store.state.recipes.length > 0) {
         next();
      }
   }
   if (store.state.recipes.length === 0) {
      store.watch(
         (state) => state.recipes.length > 0,
         (value) => {
            if (value === true) {
               proceed()
            }
         }
      )
   } else {
      proceed();
   }
}

const routes = [
   { path: '/', component: BrewsComponent, beforeEnter: waitForData },
   { path: '/recipe/:id', component: RecipeDetails, props: true, beforeEnter: waitForData }
];

export default new VueRouter({
   routes
});