const moment = require("moment");
const beforeYesterday = moment()
  .subtract(1, "days")
  .startOf("day")
  .format("M-D-YYYY");

console.log(beforeYesterday);
