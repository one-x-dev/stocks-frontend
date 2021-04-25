<template>
  <v-container>
    <v-row>
      <v-col> <search @setSearch="setSearch" /></v-col>
    </v-row>
    <v-row v-if="name" align="center">
      <v-col cols="4" align="center">
        <dashboard :data="PREDICT" :name="name" :abbr="abbr" />
      </v-col>
      <v-col cols="8">
        <timeseres :name="name" :abbr="abbr" :data="chartData()" />
      </v-col>
    </v-row>
    <v-row v-if="name">
      <v-col>
        <candlestick :name="name" :abbr="abbr" :data="stickData()" />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col align="center">
        <h2>Выберите параметры поиска</h2>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import Search from "@/components/Search.vue";
import Dashboard from "@/components/Dashboard.vue";
import Timeseres from "@/components/Timeseres.vue";
import Candlestick from "../components/Candlestick.vue";

export default {
  data() {
    return {
      name: null,
      abbr: null,
    };
  },
  components: {
    Timeseres,
    Search,
    Candlestick,
    Dashboard,
  },
  computed: {
    ...mapGetters(["DATA"]),
    ...mapGetters(["PREDICT"]),
  },
  methods: {
    stickData() {
      let temp = this.DATA.map(function (element) {
        return {
          x: element["Date"],
          y: [
            element["Open"],
            element["High"],
            element["Low"],
            element["Close"],
          ],
        };
      });
      return temp;
    },
    chartData() {
      let temp = this.DATA.map(function (element) {
        return {
          date: element["Date"],
          stock: element["Adj Close"],
        };
      });
      return temp;
    },
    setSearch(options) {
      this.name = options.company.name;
      this.abbr = options.company.abbr;

      let temp = {
        name: options.company.abbr,
        start: options.start,
        end: options.end,
      };
      this.$store.dispatch("PREDICT", temp);
      this.$store.dispatch("POST", temp);
    },
  },
};
</script>
<style scope>
a {
  text-decoration: none;
}
</style>