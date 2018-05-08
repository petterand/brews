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
         temps: []
      }
   }
});

Vue.component('batch', batchComponent);

export default batchComponent;