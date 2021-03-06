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
         showUserMenu: false,
         showToolsMenu: false,
         toolsMenuStyle: null
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
            if (!this.showLogin) {
               this.$refs.username.blur();
            }
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
         if (this.showLogin) {
            this.$refs.username.focus();
         }
      },
      toggleToolsMenu(event) {
         this.showToolsMenu = !this.showToolsMenu;
         if (this.showToolsMenu) {
            this.toolsMenuStyle = {
               left: `${event.target.offsetLeft}px`,
               top: `45px`
            }
         }
      },
      closeToolsMenu() {
         this.showToolsMenu = false;
      }
   }
});

export default TopMenuComponent;