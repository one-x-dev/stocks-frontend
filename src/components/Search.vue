<template>
  <v-container>
    <v-row class="pa-0 ma-0">
      <v-col class="pa-0 ma-0">
        <v-card>
          <v-card-title>Поиск</v-card-title>
          <v-card-text>
            <v-row class="pa-0 ma-0">
              <v-col cols="12" md="4" class="pa-1 ma-0">
                <v-autocomplete
                  v-model="select"
                  :loading="loading"
                  :items="items"
                  :search-input.sync="search"
                  cache-items
                  outlined
                  flat
                  dense
                  hide-no-data
                  hide-details
                />
              </v-col>
              <v-col cols="6" md="3" class="pa-1">
                <datepicker class="datepicker" v-model="startDate" />
              </v-col>
              <v-col cols="6" md="3" class="pa-1">
                <datepicker class="datepicker" v-model="endDate" />
              </v-col>
              <v-col cols="12" md="2" align="left" class="ma-0 pa-1">
                <v-btn color="primary" elevation="5" @click="getData">
                  Показать
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import companyes from "@/assets/company.json";

export default {
  data() {
    return {
      startDate: new Date(2020, 9, 1),
      endDate: new Date(),
      name: "",
      companyes: companyes,
      loading: false,
      items: [],
      search: null,
      select: null,
    };
  },

  components: {
    Datepicker,
  },
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
    },
  },
  computed: {
    comapnyNames() {
      return this.companyes.data.map((company) => {
        return company.name;
      });
    },
  },
  methods: {
    formatDate(date) {
      let year = date.getFullYear();
      let month = Number(date.getMonth()) + 1;
      let day = Number(date.getDate()) + 1;

      if (String(month).length == 1) {
        month = "0" + String(month);
      }
      if (String(day).length == 1) {
        day = "0" + String(day);
      }

      return year + "-" + month + "-" + day;
    },
    getData() {
      if (this.select) {
        let company = this.companyes.data.find((company) => {
          if (company.name === this.select) {
            return company;
          }
        });
        let temp = {
          company: company,
          start: this.formatDate(this.startDate),
          end: this.formatDate(this.endDate),
        };

        this.$emit("setSearch", temp);
      }
    },
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

<style scoped>
.datepicker {
  border: 1px solid grey;
  border-radius: 3px;
  padding: 8px;
}
</style>
