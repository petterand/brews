<template>
   <div>
      <h5>Temperatur</h5>
      <p class="latest-reading" v-if="temps.length > 0">Senast avlästa värde: {{latestTempReading}}°C</p>
      <div id="temp-stats-chart"></div>
      <h5>Gravity</h5>
      <p class="latest-reading" v-if="temps.length > 0">Senast avlästa värde: {{latestGravityReading}}</p>
      <div id="gravity-stats-chart"></div>
   </div>
</template>

<script>
import Utils from "../../services/Utils";
import moment from "moment";
import { GoogleCharts } from "google-charts";

function formatDateTime(date) {
  return moment(date).format("YYYY-MM-DD HH:mm  ");
}

function drawCharts(data) {
  const tempData = data.map(s => {
    return {
      measured_at: s.measured_at,
      temperature: s.temperature
    };
  });
  const gravityData = data.map(s => {
    return {
      measured_at: s.measured_at,
      gravity: s.gravity
    };
  });
  drawTempChart(tempData);
  drawGravityChart(gravityData);
}

function drawTempChart(data) {
  let dataTable = [["Tid", "Temperatur"]];
  data.forEach(stat => {
    const time = formatDateTime(stat.measured_at);
    const temp = Utils.round10(stat.temperature, -1);
    dataTable.push([time, temp]);
  });
  const chartdata = GoogleCharts.api.visualization.arrayToDataTable(dataTable);
  const chart = new GoogleCharts.api.visualization.LineChart(
    document.getElementById("temp-stats-chart")
  );
  const options = {
    curveType: "function",
    legend: {
      position: "bottom"
    },
    vAxis: {
      ticks: [5, 10, 15, 20, 25]
    }
  };
  chart.draw(chartdata, options);
}

function drawGravityChart(data) {
  let dataTable = [["Tid", "SG"]];
  data.forEach(stat => {
    const time = formatDateTime(stat.measured_at);
    const gravity = parseFloat(stat.gravity);
    dataTable.push([time, gravity]);
  });
  const chartdata = GoogleCharts.api.visualization.arrayToDataTable(dataTable);
  const chart = new GoogleCharts.api.visualization.LineChart(
    document.getElementById("gravity-stats-chart")
  );
  const options = {
    curveType: "function",
    legend: {
      position: "bottom"
    },
    vAxis: {
      ticks: [1.0, 1.01, 1.02, 1.03, 1.04, 1.05, 1.06, 1.07, 1.08, 1.09, 1.1]
    }
  };
  chart.draw(chartdata, options);
}

export default {
  props: ["temps"],
  created() {
    GoogleCharts.load(
      function() {
        drawCharts(this.temps);
      }.bind(this)
    );
  },
  computed: {
    latestGravityReading() {
      return this.temps[this.temps.length - 1].gravity;
    },
    latestTempReading() {
      return Utils.round10(this.temps[this.temps.length - 1].temperature, -1);
    }
  },
  watch: {
    temps: function(val) {
      GoogleCharts.load(
        function() {
          drawCharts(this.temps);
        }.bind(this)
      );
    }
  }
};
</script>

<style lang="less">
p.latest-reading {
  font-size: 0.8em;
}
</style>
