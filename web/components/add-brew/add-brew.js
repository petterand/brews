import Vue from 'vue';
import template from './template.tpl.html';
import BeerXmlService from '../../services/BeerXmlService';
import eventHub from '../../services/EventHub';


function fileDropHandler(e) {
    e.preventDefault();
    var file = e.dataTransfer.files[0];
    if (file && file.type === 'text/xml') {
        var reader = new FileReader();
        reader.onload = (e) => {
            var content = e.target.result;
            BeerXmlService.parse(content).then((data) => {
                eventHub.$emit('RECIPE_ADDED', data);
            });
        }
        reader.readAsText(file);
    }
}

function onDragOver(e) {
    e.preventDefault();
}

function onDragEnter(e) {
    e.preventDefault();
}

function onDragEnd(e) {
    console.log('end', e);
}

const AddBrewComponent = Vue.extend({
    template,
    methods: {
        drop: fileDropHandler,
        dragOver: onDragOver,
        dragEnter: onDragEnter,
        dragEnd: onDragEnd
    }
});

export default AddBrewComponent;