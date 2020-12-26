<template>
  <v-container>
    <v-row class="text-center" align="center" justify="center">
      <v-col cols="12">
        <h1 style="color: rgb(33, 43, 54)">Covid-19 Coronavirus</h1>
      </v-col>
      <v-spacer />
    </v-row>
    <v-row class="text-center" align="center" justify="center">
      <v-col cols="12">
        <v-spacer />
      </v-col>
      <v-col cols="12">
        <h1 style="color: rgb(33, 43, 54)">Search for Country's Update</h1>
      </v-col>
      <!-- Country value -->
      <v-col cols="12">
        <section class="country col-md-3 text-center mx-auto">
          <model-select
            :options="options"
            @input="changeCountry"
            v-model="selectedCountry"
            placeholder="Select Country"
          ></model-select>
        </section>
      </v-col>
      <v-alert type="error" v-if="countryError"
        >Sorry! The country's information could not be found.</v-alert
      >
      <v-col cols="12">
        <p class="tiya">Last Updated: {{ countriesUpdate.lastUpdate }}</p>
      </v-col>
      <v-col cols="12" md="3">
        <v-card class="mx-auto pt-3 pb-3" shaped :loading="loading">
          <v-card-text class="white">
            <p class="display-2 orange--text">
              {{ countriesUpdate.confirmed | putComma }}
            </p>
            <small class="warning--text"
              >+{{ todayInCountries }} from past yesterday</small
            >
            <h2>Confirmed</h2>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card class="mx-auto pt-3 pb-3" shaped :loading="loading">
          <v-card-text class="white">
            <p class="display-2" style="color: rgb(236, 49, 75)">
              {{ countriesUpdate.deaths | putComma }}
            </p>
            <small class="error--text">{{ countryDeathPercentage }}%</small>
            <h2>Death</h2>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card class="mx-auto pt-3 pb-3" shaped :loading="loading">
          <v-card-text class="white">
            <p class="display-2" style="color: rgb(5, 181, 132)">
              {{ countriesUpdate.recovered | putComma }}
            </p>
            <small class="success--text"
              >{{ countryRecoveredPercentage }}%</small
            >
            <h2>Recovered</h2>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="text-center" align="center" justify="center">
      <v-col cols="12">
        <h1 style="color: rgb(33, 43, 54)">Global Cases</h1>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="mx-auto pt-3 pb-3" shaped :loading="globalLoading">
          <v-card-text class="white">
            <p class="display-2 orange--text">
              {{ global.confirmed | putComma }}
            </p>
            <small class="warning--text"
              >+{{ todayInGlobal }} from past yesterday</small
            >
            <h2>Confirmed</h2>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="mx-auto pt-3 pb-3" shaped :loading="globalLoading">
          <v-card-text class="white">
            <p class="display-2" style="color: rgb(236, 49, 75)">
              {{ global.deaths | putComma }}
            </p>
            <small class="error--text">{{ globalDeathPercentage }}%</small>
            <h2>Death</h2>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="mx-auto pt-3 pb-3" shaped :loading="globalLoading">
          <v-card-text class="white">
            <p class="display-2" style="color: rgb(5, 181, 132)">
              {{ global.recovered | putComma }}
            </p>
            <small class="success--text"
              >{{ globalRecoveredPercentage }}%</small
            >
            <h2>Recovered</h2>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import moment from "moment";
import countries from "./countries.json";
import { ModelSelect } from "vue-search-select";

export default {
  name: "Home",
  components: { ModelSelect },

  data: () => ({
    baseEndpoint: "http://localhost:3000/api/NgnaoH",
    data: "",
    todayInCountries: 0,
    countryDeathPercentage: 0,
    countryRecoveredPercentage: 0,
    todayInGlobal: 0,
    globalDeathPercentage: 0,
    globalRecoveredPercentage: 0,
    countryError: false,
    loading: false,
    globalLoading: false,
    options: [],
    selectedCountry: {
      value: "",
      text: "",
    },
    global: {
      confirmed: 0,
      deaths: 0,
      recovered: 0,
      lastUpdate: "",
    },
    countriesUpdate: {
      confirmed: 0,
      deaths: 0,
      recovered: 0,
      lastUpdate: "",
    },
  }),
  methods: {
    async getRootData() {
      this.globalLoading = true;
      const response = await axios.get(`${this.baseEndpoint}`);
      this.data = response.data;
      // console.log(this.data);
      this.global.confirmed = this.data.confirmed.value;
      this.global.deaths = this.data.deaths.value;
      this.global.recovered = this.data.recovered.value;
      this.global.lastUpdate = moment(this.data.lastUpdate).format(
        "MMMM Do YYYY, h:mm:ss a"
      );
      this.globalLoading = false;
    },
    async getCountries() {
      for (let [text, value] of Object.entries(countries)) {
        this.options.push({ text, value });
      }
    },
    async changeCountry() {
      this.countryRecoveredPercentage = 0;
      this.countryDeathPercentage = 0;
      this.todayInCountries = 0;
      for (let [key] of Object.entries(this.countriesUpdate)) {
        this.countriesUpdate[key] = 0;
      }
      this.countryError = false;
      this.loading = true;
      let data;
      try {
        data = await axios.get(
          `${this.baseEndpoint}/countries/${this.selectedCountry.value}`
        );
        setTimeout(() => {
          this.countryError = true;
        }, 3000);
      } catch {
        this.loading = true;
        this.countryError = true;
      }
      this.countriesUpdate = {
        confirmed: 0,
        deaths: 0,
        recovered: 0,
        lastUpdate: "",
      };
      let yesterdayResponse;
      let beforeYesterdayResponse;
      try {
        yesterdayResponse = await axios.get(
          `${this.baseEndpoint}/daily/yesterday`
        );
        beforeYesterdayResponse = await axios.get(
          `${this.baseEndpoint}/daily/beforeYesterday`
        );
      } catch (error) {
        yesterdayResponse = await axios.get(
          `${this.baseEndpoint}/daily/beforeYesterday`
        );
        beforeYesterdayResponse = await axios.get(
          `${this.baseEndpoint}/daily/tempBeforeYesterday`
        );
      }
      let yesterdayConfirm = 0;
      let beforeYesterdayConfirm = 0;
      let globalYesterdayConfirm = 0;
      let globalBeforeYesterdayConfirm = 0;
      yesterdayResponse.data.map((data) => {
        globalYesterdayConfirm += Number(data.confirmed);
        if (data.countryRegion == this.selectedCountry.text) {
          yesterdayConfirm += Number(data.confirmed);
        }
      });
      beforeYesterdayResponse.data.map((data) => {
        globalBeforeYesterdayConfirm += Number(data.confirmed);
        if (data.countryRegion == this.selectedCountry.text) {
          beforeYesterdayConfirm += Number(data.confirmed);
        }
      });
      this.loading = false;
      console.log(data.data.confirmed.value);
      this.countriesUpdate.confirmed = data.data.confirmed.value;
      this.countriesUpdate.deaths = data.data.deaths.value;
      this.countriesUpdate.recovered = data.data.recovered.value;
      this.countriesUpdate.lastUpdate = moment(data.data.lastUpdate).format(
        "MMMM Do YYYY, h:mm:ss a"
      );
      this.todayInGlobal =
        globalYesterdayConfirm -
        globalBeforeYesterdayConfirm +
        (this.global.confirmed - globalYesterdayConfirm);
      this.todayInCountries =
        yesterdayConfirm -
        beforeYesterdayConfirm +
        (this.countriesUpdate.confirmed - yesterdayConfirm);
      this.globalRecoveredPercentage = Math.round(
        (this.global.recovered / this.global.confirmed) * 100
      );
      this.countryRecoveredPercentage = Math.round(
        (this.countriesUpdate.recovered / this.countriesUpdate.confirmed) * 100
      );
      this.globalDeathPercentage = Math.round(
        (this.global.deaths / this.global.confirmed) * 100
      );
      this.countryDeathPercentage = Math.round(
        (this.countriesUpdate.deaths / this.countriesUpdate.confirmed) * 100
      );
    },
  },
  filters: {
    putComma(number) {
      return Number(number).toLocaleString();
    },
  },
  created() {
    this.getRootData();
    this.getCountries();
  },
};
</script>
<style scoped>
.tiya {
  text-decoration: none;
  color: rgb(76, 175, 80) !important;
}
.v-sheet {
  border-radius: 10px;
  border: none;
}
.v-card {
  box-shadow: none;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 500;
}
small {
  font-size: 14px;
}
</style>
