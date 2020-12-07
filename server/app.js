const express = require("express");

const axios = require("axios").default;

const moment = require("moment");

const _ = require('lodash')

const app = express();

const PORT = 3000;

const HOST = "localhost";

const baseURL = "https://api.covid19api.com";

  app.get("/global", async (req, res) => {
    const response = await axios.get(`${baseURL}/summary`);
    const result = response.data.Global
    res.json(result);
  });

  app.get("/total/country/:countrySlug", async (req, res) => {
    const response = await axios.get(`${baseURL}/summary`);
    const data = response.data.Countries
    const countries = _.groupBy(data, 'Slug')
    const country = req.params.countrySlug
    const result = countries[country]
    res.json(result);
  });

  app.get("/fivedays/country/:countrySlug", async (req, res) => {
    const todayUTC = moment.utc(moment().startOf("day"))
    const fiveDayAgoUTC = moment.utc(moment().subtract(8, "d").startOf("day"))
    const response = await axios.get(`${baseURL}/country/${req.params.countrySlug}`, {
      params: {
        from: "" + fiveDayAgoUTC,
        to: "" + todayUTC,
      }
    });
    const data = response.data
    const countries = _.groupBy(data, "Date")
    const result = countries
    res.json(result);
  });

  // app.get("/total/countries", async (req, res) => {
  //   const data = await axios.get(`${baseURL}/countries`);
  //   res.json(data.data);
  // });
  // app.get("/total/country", async (req, res) => {
  //   const data = await axios.get(`${baseURL}/`);
  //   res.json(data.data);
  // });

app.listen(PORT, HOST, () => {
  console.log(`Server is listening at ${HOST}:${PORT}`);
});


