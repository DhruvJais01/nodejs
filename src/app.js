const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Customer = require("./models/customer");

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for POST requests

mongoose.set("strictQuery", false);

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const PORT = process.env.PORT || 3000;
const CONNECTION = process.env.CONNECTION;

const customers = [
  { name: "Caleb", industry: "music" },
  { name: "John", industry: "networking" },
  { name: "Sal", industry: "sports medicine" },
];

const customer = new Customer({
  name: "john",
  industry: "sports",
});

// customer.save();

app.get("/", (req, res) => {
  res.send("Welcome!");
});

app.get("/api/customers", async (req, res) => {
  try {
    const result = await Customer.find();
    res.json({ customers: result });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/api/customers", async (req, res) => {
  console.log(req.body);
  // this way we can save data from client side
  const customer = new Customer(req.body);

  try {
    await customer.save();
    res.status(200).json({ customer });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.post("/", (req, res) => {
  res.send("This is a post request");
});

const start = async () => {
  try {
    await mongoose.connect(CONNECTION);

    app.listen(PORT, () => {
      console.log("App listening on port " + PORT);
    });
  } catch (e) {
    console.log(e.message);
  }
};

start();
