<template>
<div id="editRecipe">
  <h3>EDIT</h3>
  <file-drop-area :on-file-parsed="onFileParsed" v-if="!updatedRecipe"></file-drop-area>
  <div v-if="updatedRecipe">
     <h5>{{updatedRecipe.name}}</h5>
     <p>Vill du skapa en ny version eller uppdatera den nuvarande versionen?</p>
     <label for="createVersionChoice">Ny version:</label>
     <input type="radio" id="createVersionChoice" name="updateOrVersion" v-model="updateOrVersion" value="version">
     <label for="updateRecipeChoice">Uppdatera:</label>
     <input type="radio" id="updateRecipeChoice" name="updateOrVersion" v-model="updateOrVersion" value="update">
     <div class="dialog-button-wrapper"><button @click="save">Spara</button></div>
  </div>
</div>
</template>

<script>
import FileDropArea from "../file-drop-area/FileDropArea.vue";

export default {
  components: {
    FileDropArea
  },
  methods: {
    onFileParsed(_recipe) {
      this.updatedRecipe = _recipe;
    },
    save() {
      console.log(this.updateOrVersion);
    }
  },
  data() {
    return {
      updatedRecipe: null,
      updateOrVersion: "version"
    };
  }
};
</script>

<style>

</style>
