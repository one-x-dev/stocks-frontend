<template>
  <v-card elevation="4">
    <v-card-text>
      <apexchart
        v-if="data.length > 0"
        :key="'x' + key"
        height="350"
        :options="chartOptions"
        :series="series"
      />
      <v-container v-else>
        <v-row>
          <v-col align="center">
            <v-progress-circular
              :size="70"
              indeterminate
              color="primary"
            ></v-progress-circular>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
export default {
  props: ["data", "name", "abbr"],
  data() {
    return {
      key: 0,
      series: [
        {
          name: "",
          data: [],
        },
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
        },
        title: {
          text: "Цена акции ",
          align: "left",
        },
        grid: {
          xaxis: {
            lines: {
              show: true,
            },
          },
          yaxis: {
            lines: {
              show: true,
            },
          },
        },
        xaxis: {
          categories: [],
          labels: {
            rotate: -45,
            rotateAlways: true,
          },
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
  components: {
    apexchart: VueApexCharts,
  },
  watch: {
    data() {
      this.series[0].data = this.getStocks();
      this.series[0].name = this.abbr;
      this.chartOptions.xaxis.categories = this.getDates();
      this.chartOptions.title.text = "Цена акции " + this.name;
      this.key += 1;
    },
  },
  methods: {
    getStocks() {
      let temp = this.data.map((element) => {
        return element["stock"];
      });
      return temp;
    },
    getDates() {
      let temp = this.data.map((element) => {
        let date = element["date"].split(" ");
        return date[1] + " " + date[2] + " " + date[3];
      });
      return temp;
    },
  },
};
</script>