import Vue from 'vue';
import template from './template.tpl.html';

const TopMenuComponent = Vue.extend({
   template,
   methods: {
      linkIsActive(input) {
         return this.$route.path === input;
      }
   }
});

export default TopMenuComponent;