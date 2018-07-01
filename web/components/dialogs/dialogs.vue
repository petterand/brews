<template>
   <div>
      <dialog id="editRecipeDialog">
         <div class="dialog-close-icon" @click="closeDialog"><span class="fa fa-times"></span></div>
         <edit-recipe></edit-recipe>
      </dialog>
   </div>
</template>

<script>
import EditRecipe from "../edit-recipe/EditRecipe.vue";
export default {
  components: {
    EditRecipe
  },
  methods: {
    closeDialog(e) {
      const dialog = e.path.find(el => {
        return el.nodeName === "DIALOG";
      });
      if (dialog) {
        dialog.close();
      }
    }
  }
};
</script>
