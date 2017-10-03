import VueRouter from 'vue-router';
import Vue from 'vue';
import store from './services/Store';

import RecipeList from './components/recipe-list/recipe-list';
import RecipeDetails from './components/recipe-details/recipe-details';
import addBrew from './components/add-brew/add-brew';

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
   { path: '/', component: RecipeList, beforeEnter: waitForData },
   { path: '/recipe/:id', component: RecipeDetails, props: true, beforeEnter: waitForData },
   { path: '/add', component: addBrew }
];

export default new VueRouter({
   routes
});