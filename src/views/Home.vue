<template>
  <v-container>
    <v-row>
      <v-col> <search @setSearch="setSearch" /></v-col>
    </v-row>
    <v-row v-if="name" align="center">
      <v-col v-if="PREDICT">
        <timeseres :name="name" :abbr="abbr" :data="PREDICT" />
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
import Timeseres from "@/components/Timeseres.vue";

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
  },
  computed: {
    ...mapGetters(["PREDICT"]),
  },
  methods: {
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