import Vue from 'vue';
import template from './template.tpl.html';
import TempService from '../../services/TempService';
import BatchService from '../../services/BatchService';
import TempChart from '../temp-chart/TempChart.vue';

import Utils from '../../services/Utils';

function getTemps(id) {
   return new Promise((resolve, reject) => {
      TempService.getTemps(id).then((temps) => {
         resolve(temps);
      });
   });
}

function formatDateTime(date) {
   return moment(date).format("YYYY-MM-DD HH:mm:ss");
}

const batchComponent = Vue.extend({
   template,
   props: ["batch"],
   components: {
      TempChart
   },
   created() {
      if (this.$store.state.selectedBatch) {
         getTemps(this.$store.state.selectedBatch.id).then(function (temps) {
            this.temps = temps;
         }.bind(this));
      }
   },
   methods: {
      startFermentation() {
         this.$store.dispatch('startFermentation');
      },
      stopFermentation() {
         this.$store.dispatch('stopFermentation');
      },
      saveMeasuredValues() {
         this.$store.dispatch('saveMeasuredvalues', this.measured_values);
      },
      saveBatchNotes() {
         this.$store.dispatch('saveBatchNotes', this.notes);
      },
      formatDateTime
   },
   computed: {
      fermentationStarted() {
         return this.$store.state.selectedBatch.fermStart && !this.$store.state.selectedBatch.fermStop;
      },
      fermentationEnded() {
         return this.$store.state.selectedBatch.fermStart && this.$store.state.selectedBatch.fermStop;
      },
      selectedBatch() {
         return this.$store.state.selectedBatch;
      }

   },
   watch: {
      batch: function (val) {
         this.temps = null;
         getTemps(this.$store.state.selectedBatch.id).then(function (temps) {
            this.temps = temps;
         }.bind(this));
      }
   },
   data() {
      return {
         temps: [],
         notes: this.$store.state.selectedBatch.notes,
         measured_values: {
            mash_ph: this.$store.state.selectedBatch.mash_ph || null,
            boil_vol: this.$store.state.selectedBatch.boil_vol || null,
            preboil_sg: this.$store.state.selectedBatch.preboil_sg || null,
            postboil_vol: this.$store.state.selectedBatch.postboil_vol || null,
            og: this.$store.state.selectedBatch.og || null,
            fermentation_vol: this.$store.state.selectedBatch.fermentation_vol || null,
            fg: this.$store.state.selectedBatch.fg || null,
         }
      }
   }
});

Vue.component('batch', batchComponent);

export default batchComponent;