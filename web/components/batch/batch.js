import Vue from 'vue';
import template from './template.tpl.html';
import TempService from '../../services/TempService';
import { GoogleCharts } from 'google-charts';
import BatchService from '../../services/BatchService';
import moment from 'moment';
import Utils from '../../services/Utils';

function getTemps(id) {
   return new Promise((resolve, reject) => {
      TempService.getTemps(id).then((temps) => {
         resolve(temps);
      });
   });
}

function drawStatsChart(data) {
   let dataTable = [['Tid', 'Temperatur', 'SG']];
   data.forEach(stat => {
      const time = formatDateTime(stat.measured_at);
      const temp = Utils.round10(stat.temperature, -1);
      const gravity = parseFloat(stat.gravity);
      dataTable.push([time, temp, gravity]);
   })
   const chartdata = GoogleCharts.api.visualization.arrayToDataTable(dataTable);
   const chart = new GoogleCharts.api.visualization.LineChart(document.getElementById('fermentation-stats-chart'));
   const options = {
      curveType: 'function',
      legend: {
         position: 'bottom'
      }
   }
   chart.draw(chartdata, options);
}

function formatDateTime(date) {
   return moment(date).format('YYYY-MM-DD HH:mm:ss');
}

const batchComponent = Vue.extend({
   template,

   created() {
      console.log(this.$store.state.selectedBatch);
      if (this.$store.state.selectedBatch) {
         getTemps(this.$store.state.selectedBatch.id).then(function (temps) {
            this.temps = temps;
            if (temps.length > 0) {
               GoogleCharts.load(function () {
                  drawStatsChart(temps);
               });
            }
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