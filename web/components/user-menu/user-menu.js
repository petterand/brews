import Vue from 'vue';
import template from './template.tpl.html';
import store from '../../services/Store';
import eventHub from '../../services/EventHub';

const UserMenuComponent = Vue.extend({
   template,
   props: ['showMenu'],
   methods: {
      signout() {
         store.dispatch('logout').then(() => {
            eventHub.$emit('signedOut');
         });
      }
   }
});

export default UserMenuComponent;