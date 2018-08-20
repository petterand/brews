<template>
<div id="editRecipe">
  <h3>EDIT</h3>
  <file-drop-area :on-file-parsed="onFileParsed" v-if="!updatedRecipe"></file-drop-area>
  <div v-if="updatedRecipe">
     <h5>{{updatedRecipe.name}}</h5>
     <p>Vill du skapa en ny version eller uppdatera den nuvarande versionen?</p>
     <label for="createVersionChoice">Ny version:</label>
     <input type="radio" id="createVersionChoice" name="updateOrVersion" v-model="updateOrVersion" value="new_version">
     <label for="updateRecipeChoice">Uppdatera:</label>
     <input type="radio" id="updateRecipeChoice" name="updateOrVersion" v-model="updateOrVersion" value="replace">
     <div class="dialog-button-wrapper"><button @click="save">Spara</button></div>
  </div>
</div>
</template>

<script>
import FileDropArea from "../file-drop-area/FileDropArea.vue";
import EventHub from "../../services/EventHub";

export default {
  components: {
    FileDropArea
  },
  methods: {
    onFileParsed(_recipe) {
      this.updatedRecipe = _recipe;
    },
    save() {
      if (this.updateOrVersion === "replace") {
        const dispatchObject = {
          recipe: this.updatedRecipe,
          version: parseInt(this.$store.state.selectedRecipeVersion.version)
        };
        this.$store.dispatch("replaceRecipeVersion", dispatchObject).then(
          function() {
            this.updatedRecipe = null;
            this.updateOrVersion = "new_version";
            document.querySelector("#editRecipeDialog").close();
          }.bind(this)
        );
      } else if (this.updateOrVersion === "new_version") {
        this.$store.dispatch("addRecipeVersion", this.updatedRecipe).then(
          function() {
            EventHub.$emit("VERSION_ADDED");
            this.updatedRecipe = null;
            this.updateOrVersion = "new_version";
            document.querySelector("#editRecipeDialog").close();
          }.bind(this)
        );
      }
    }
  },
  data() {
    return {
      updatedRecipe: null,
      updateOrVersion: "new_version"
    };
  }
};
</script>

<style>
</style>
