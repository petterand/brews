<template>
<div>
   <div id="file-drop-zone" @drop="drop" @dragover="dragOver" @dragenter="dragEnter" @dragend="dragEnd" @dragleave="dragOut"
        :class="{'file-hover': activeHover}">
      <span>Släpp din beerxml fil här!</span>
      <span class="fa fa-file-o file-icon"></span>
   </div>
</div>
</template>

<script>
import BeerXmlService from "../../services/BeerXmlService";

function fileDropHandler(e) {
  e.preventDefault();
  this.activeHover = false;
  var file = e.dataTransfer.files[0];
  if (file && file.type === "text/xml") {
    var reader = new FileReader();
    reader.onload = e => {
      var content = e.target.result;
      BeerXmlService.parse(content).then(recipe => {
        this.onFileParsed(recipe);
      });
    };
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
export default {
  props: ["onFileParsed"],
  methods: {
    drop: fileDropHandler,
    dragOver: onDragOver,
    dragEnter: onDragEnter,
    dragEnd: onDragEnd,
    dragOut: onDragOut
  },
  data: function() {
    return {
      activeHover: false
    };
  }
};
</script>

<style>

</style>
