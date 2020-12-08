const express = require("express");

const cors = require("cors");

const axios = require("axios");

const moment = require("moment");

// const _ = require("lodash");

const app = express();

const PORT = 3000;

const HOST = "localhost";

const baseURL = "https://covid19.mathdro.id/api";

app.get("/api", cors(), async (req, res) => {
  const response = await axios.get(`${baseURL}`);
  const result = response.data;
  res.json(result);
});
app.get("/api/countries/:isoCountry", cors(), async (req, res) => {
  const response = await axios.get(`${baseURL}/countries/${req.params.isoCountry}`);
  const result = response.data;
  res.json(result);
});
app.get("/api/daily/yesterday", cors(), async (req, res) => {
  const yesterday = moment()
        .subtract(1, "days")
        .startOf("day")
        .format("M-D-YYYY");
  const response = await axios.get(`${baseURL}/daily/${yesterday}`);
  const result = response.data;
  res.json(result);
});
app.get("/api/daily/beforeYesterday", cors(), async (req, res) => {
  const beforeYesterday = moment()
        .subtract(2, "days")
        .startOf("day")
        .format("M-D-YYYY");
  const response = await axios.get(`${baseURL}/daily/${beforeYesterday}`);
  const result = response.data;
  res.json(result);
});
app.get("/api/daily/tempBeforeYesterday", cors(), async (req, res) => {
  const tempBeforeYesterday = moment()
        .subtract(3, "days")
        .startOf("day")
        .format("M-D-YYYY");
  const response = await axios.get(`${baseURL}/daily/${tempBeforeYesterday}`);
  const result = response.data;
  res.json(result);
});

app.listen(PORT, HOST, () => {
  console.log(`Server is listening at ${HOST}:${PORT}`);
});
