<template>
  <v-card elevation="4">
    <v-card-title> Прогноз </v-card-title>
    <v-card-text>
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
export default {};
</script>

<style scoped>
</style>