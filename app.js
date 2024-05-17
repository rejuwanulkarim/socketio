const express = require("express");
const app = express();

app.post("/", () => {
  console.log("/ Request");
})