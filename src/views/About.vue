<template>
  <v-container>
    <v-row>
      <v-col>
        {{ select }}
        
          <v-autocomplete
            v-model="select"
            :loading="loading"
            :items="items"
            :search-input.sync="search"
            cache-items
            class="mx-4"
            flat
            hide-no-data
            hide-details
          />
       
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import companyes from "@/assets/company.json";
export default {
  data() {
    return {
      companyes: companyes,
      loading: false,
      items: [],
      search: null,
      select: null,
    };
  },
  computed: {
    comapnyNames() {
      return this.companyes.data.map((company) => {
        return company.name;
      });
    },
  },
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
    },
  },
  methods: {
    querySelections(v) {
      this.loading = true;
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.comapnyNames.filter((e) => {
          return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
        });
        this.loading = false;
      }, 500);
    },
  },
};
</script>