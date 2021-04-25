<template>
  <v-card elevation="4">
    <v-card-title> Прогноз </v-card-title>
    <v-card-text v-if="data">
      <v-row>
        <v-col align="center">
          <h1>
            <v-icon color="rgb(28, 211, 28)" size="48"> mdi-arrow-up </v-icon>
            {{ Number(data.predict).toFixed(2) }}
          </h1>
          <h2 class="ma-2">+65.02 (+1.66%)</h2>
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
  props: ["data", "name", "abbr"],
};
</script>

<style scoped>
h1 {
  color: rgb(28, 211, 28);
  font-size: 52px;
}
h2 {
  color: rgb(28, 211, 28);
}
</style>