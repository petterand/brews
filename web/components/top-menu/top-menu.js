import Vue from 'vue';
import template from './template.tpl.html';

const TopMenuComponent = Vue.extend({
   template,
   methods: {
      linkIsActive(input) {
         console.log(this.$route.path);
         return this.$route.path === input;
      }
   }
});

export default TopMenuComponent;