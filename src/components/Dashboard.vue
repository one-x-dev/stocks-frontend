<template>
  <v-card elevation="4">
    <v-card-title> Прогноз </v-card-title>
    <v-card-text v-if="predict">
      <v-row>
        <v-col align="center">
          <h1 v-if="upper" class="up">
            <v-icon color="rgb(28, 211, 28)" size="48"> mdi-arrow-up </v-icon>
            {{ Number(predict.predict).toFixed(2) }}$
          </h1>
          <h1 v-else class="down">
            <v-icon color="rgb(250, 0, 0)" size="48"> mdi-arrow-down </v-icon>
            {{ Number(predict.predict).toFixed(2) }}$
          </h1>

          <h2 class="ma-2">
            <span v-if="upper" class="up">
              +{{ Number(difference).toFixed(2) }}$ ({{
                Number(percentum).toFixed(2)
              }}%)
            </span>
            <span v-else class="down">
              {{ Number(difference).toFixed(2) }}$ ({{
                Number(percentum).toFixed(2)
              }}%)
            </span>
          </h2>
        </v-col>
      </v-row>
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
export default {
  props: ["predict", "data", "name", "abbr"],
  data() {
    return {
      upper: null,
      difference: null,
      percentum: null,
    };
  },
  mounted() {
    if (this.predict.predict) {
      if (this.predict.predict >= this.data["Adj Close"]) {
        this.upper = true;
      } else {
        this.upper = false;
      }

      this.difference = this.predict.predict - this.data["Adj Close"];
      this.percentum = this.difference / (this.predict.predict / 100);
    }
  },
};
</script>

<style scoped>
.up {
  color: rgb(28, 211, 28);
}
.down {
  color: rgb(250, 0, 0);
}
</style>