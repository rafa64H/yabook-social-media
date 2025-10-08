const express = require("express");

const app = express();

const PORT = 5000;

app.get("/", async (req, res) => {
  res.send("hola");
});

app.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});
