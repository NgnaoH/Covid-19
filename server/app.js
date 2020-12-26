const express = require("express");
const cors = require("cors");
const axios = require("axios");
const moment = require("moment");
const chalk = require("chalk");
// const _ = require("lodash");
const app = express();
const PORT = 3000;
const HOST = "localhost";

const baseURL = "https://covid19.mathdro.id/api";

app.get("/api/NgnaoH", cors(), async (req, res) => {
  const response = await axios.get(`${baseURL}`);
  const result = response.data;
  res.json(result);
});
app.get("/api/NgnaoH/countries/:isoCountry", cors(), async (req, res) => {
  try {
    const response = await axios.get(
      `${baseURL}/countries/${req.params.isoCountry}`
    );
    const result = response.data;
    res.json(result);
  } catch {
    
  }
});

app.get("/api/NgnaoH/daily/yesterday", cors(), async (req, res) => {
  const yesterday = moment()
    .subtract(2, "days")
    .startOf("day")
    .format("M-D-YYYY");
  const response = await axios.get(`${baseURL}/daily/${yesterday}`);
  const result = response.data;
  res.json(result);
});
app.get("/api/NgnaoH/daily/beforeYesterday", cors(), async (req, res) => {
  const beforeYesterday = moment()
    .subtract(3, "days")
    .startOf("day")
    .format("M-D-YYYY");
  const response = await axios.get(`${baseURL}/daily/${beforeYesterday}`);
  const result = response.data;
  res.json(result);
});
app.get("/api/NgnaoH/daily/tempBeforeYesterday", cors(), async (req, res) => {
  const tempBeforeYesterday = moment()
    .subtract(4, "days")
    .startOf("day")
    .format("M-D-YYYY");
  const response = await axios.get(`${baseURL}/daily/${tempBeforeYesterday}`);
  const result = response.data;
  res.json(result);
});

app.listen(PORT, HOST, () => {
  console.log(chalk.green(`Server is listening at ${HOST}:${PORT}`));
});
