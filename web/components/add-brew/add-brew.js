import Vue from 'vue';
import { parseString } from 'xml2js';
import template from './template.tpl.html';


function fileDropHandler(e) {
    e.preventDefault();
    var file = e.dataTransfer.files[0];
    if (file && file.type === 'text/xml') {
        var reader = new FileReader();
        reader.onload = (e) => {
            var content = e.target.result;
            parseString(content, (err, result) => {
                console.log(result);
            });
        }
        reader.readAsText(file);
        console.log(file);
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