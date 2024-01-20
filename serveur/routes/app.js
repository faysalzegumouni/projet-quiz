const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const apiRouter = require("./apiRouter");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb+srv://irachid:imane@cluster0.egqr6za.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB database connection established successfully");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}/`);
});
