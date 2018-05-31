import Vue from 'vue';
import template from './template.tpl.html';
import TempService from '../../services/TempService';
import BatchService from '../../services/BatchService';
import TempChart from '../temp-chart/TempChart.vue';
import Utils from '../../services/Utils';
import moment from 'moment';

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

      // const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
      // var ws = new WebSocket(`${protocol}://${window.location.hostname}/${protocol}`);

      // ws.onmessage = function (ev) {
      //    var obj = JSON.parse(ev.data);
      //    this.live = obj;
      // }.bind(this);
   },
   methods: {
      startFermentation() {
         this.$store.dispatch('startFermentation');
      },
      stopFermentation() {
         this.$store.dispatch('stopFermentation');
      },
      saveMeasuredValues() {
         Object.keys(this.measured_values).forEach(key => {
            if (this.measured_values[key] === '-' || this.measured_values[key] === '') {
               this.measured_values[key] = null;
            }
         })
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
      },
      calculatedABV() {
         let abv = 0;
         const OG = parseFloat(this.measured_values.og);
         const FG = parseFloat(this.measured_values.fg);
         if ((OG && OG !== '-') && (FG && FG !== '-')) {
            abv = ((76.08 * (OG - FG) / (1.775 - OG)) * (FG / 0.794))
         }
         return abv > 0 ? `${Utils.round10(abv, -1)}%` : '-';
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
         live: null,
         measured_values: {
            mash_ph: this.$store.state.selectedBatch.mash_ph || (this.$store.state.isLoggedIn ? null : '-'),
            boil_vol: this.$store.state.selectedBatch.boil_vol || (this.$store.state.isLoggedIn ? null : '-'),
            preboil_sg: this.$store.state.selectedBatch.preboil_sg || (this.$store.state.isLoggedIn ? null : '-'),
            postboil_vol: this.$store.state.selectedBatch.postboil_vol || (this.$store.state.isLoggedIn ? null : '-'),
            og: this.$store.state.selectedBatch.og || (this.$store.state.isLoggedIn ? null : '-'),
            fermentation_vol: this.$store.state.selectedBatch.fermentation_vol || (this.$store.state.isLoggedIn ? null : '-'),
            fg: this.$store.state.selectedBatch.fg || (this.$store.state.isLoggedIn ? null : '-'),
         }
      }
   }
});

Vue.component('batch', batchComponent);

export default batchComponent;