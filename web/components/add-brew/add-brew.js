import Vue from 'vue';
import template from './template.tpl.html';
import store from '../../services/Store';
import BeerXmlService from '../../services/BeerXmlService';
import eventHub from '../../services/EventHub';
import Utils from '../../services/Utils';


function fileDropHandler(e) {
    e.preventDefault();
    this.activeHover = false;
    var file = e.dataTransfer.files[0];
    if (file && file.type === 'text/xml') {
        var reader = new FileReader();
        reader.onload = (e) => {
            var content = e.target.result;
            BeerXmlService.parse(content).then((recipe) => {
                this.recipe = recipe;
                console.log(recipe);
            });
        }
        reader.readAsText(file);
    }
}

function onDragOver(e) {
    e.preventDefault();
}

function onDragEnter(e) {
    this.activeHover = true;
    e.preventDefault();
}

function onDragEnd(e) {
    this.activeHover = false;
    e.preventDefault();
}

function onDragOut(e) {
    this.activeHover = false;
    e.preventDefault();
}

const AddBrewComponent = Vue.extend({
    template,
    methods: {
        drop: fileDropHandler,
        dragOver: onDragOver,
        dragEnter: onDragEnter,
        dragEnd: onDragEnd,
        dragOut: onDragOut
    },
    data: function () {
        return {
            activeHover: false,
            recipe: null
        }
    },
    beforeRouteEnter(to, from, next) {
        if (!store.state.isLoggedIn)  {
            next('/404');
        } else {
            next();
        }
    }
});

export default AddBrewComponent;