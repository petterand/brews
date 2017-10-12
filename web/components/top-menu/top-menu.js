import Vue from 'vue';
import template from './template.tpl.html';
import store from '../../services/Store';
import eventHub from '../../services/EventHub';
import userMenu from '../user-menu/user-menu';

const TopMenuComponent = Vue.extend({
   template,
   data: () => {
      return {
         showLogin: false,
         creds: { username: '', password: '' },
         showUserMenu: false
      }
   },
   created() {
      eventHub.$on('signedOut', () => {
         this.showUserMenu = false;
      });
   },
   components: {
      'user-menu': userMenu
   },
   methods: {
      linkIsActive(input) {
         return this.$route.path === input;
      },
      toggleLoginOrMenu() {
         if (!store.getters.isLoggedIn) {
            this.showLogin = !this.showLogin;
         } else {
            this.showUserMenu = !this.showUserMenu;
         }
      },
      signin($ev) {
         if ($ev.keyCode === 13) {
            store.dispatch('login', this.creds).then(() => {
               this.showLogin = false;
            });
         }
      },
      focusInput() {
         this.$refs.username.focus();
      }
   }
});

export default TopMenuComponent;