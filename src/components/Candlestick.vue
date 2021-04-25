<template>
  <v-card id="chart">
    <v-card-text v-if="data">
      <apexchart
        :key="'x' + key"
        type="candlestick"
        height="350"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </v-card-text>
    <v-card-text v-else>
      <v-row>
        <v-col align="center">
          <v-progress-circular
            :size="70"
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  props: ["data", "name", "abbr"],
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      key: 0,
      series: [
        {
          data: [],
        },
      ],
      chartOptions: {
        chart: {
          type: "candlestick",
          height: 350,
          zoom: {
            enabled: false,
          },
        },
        title: {
          text: "",
          align: "left",
        },
        xaxis: {
          type: "datetime",
        },
        yaxis: {
          labels: {
            formatter: (value) => {
              return parseInt(value);
            },
          },
        },
      },
    };
  },
  watch: {
    data() {
      this.series[0].data = this.data;
      this.key += 1;
    },
  },
};
</script>