<template>
  <div id="fermentation-stats-chart"></div>
</template>

<script>
import Utils from "../../services/Utils";
import moment from "moment";
import { GoogleCharts } from "google-charts";

function formatDateTime(date) {
  return moment(date).format("YYYY-MM-DD HH:mm:ss");
}

function drawStatsChart(data) {
  let dataTable = [["Tid", "Temperatur", "SG"]];
  data.forEach(stat => {
    const time = formatDateTime(stat.measured_at);
    const temp = Utils.round10(stat.temperature, -1);
    const gravity = parseFloat(stat.gravity);
    dataTable.push([time, temp, gravity]);
  });
  const chartdata = GoogleCharts.api.visualization.arrayToDataTable(dataTable);
  const chart = new GoogleCharts.api.visualization.LineChart(
    document.getElementById("fermentation-stats-chart")
  );
  const options = {
    curveType: "function",
    legend: {
      position: "bottom"
    }
  };
  chart.draw(chartdata, options);
}
export default {
  props: ["temps"],
  created() {
    GoogleCharts.load(
      function() {
        drawStatsChart(this.temps);
      }.bind(this)
    );
  },
  watch: {
    temps: function(val) {
      console.log(val);
      GoogleCharts.load(
        function() {
          drawStatsChart(this.temps);
        }.bind(this)
      );
    }
  }
};
</script>

<style>

</style>
