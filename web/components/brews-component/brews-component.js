import Vue from 'vue';
import template from './template.tpl.html';
import eventHub from '../../services/EventHub';


var BrewsComponent = Vue.extend({
    template,
    props: ['brews']
})

export default BrewsComponent;