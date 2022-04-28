const express = require("express");
const cors = require("cors");
const app = express();

const {
  Transactions,
  Products,
  TransactionsProducts,
} = require("./models/index");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/products", async (req, res) => {
  try {
    let data = await Products.findAll();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
