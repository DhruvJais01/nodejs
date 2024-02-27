const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.set("strictQuery", false);
const PORT = 3000;

const customers = [
  { name: "Caleb", industry: "music" },
  { name: "John", industry: "networking" },
  { name: "Sal", industry: "sports medicine" },
];

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.get("/api/customers", (req, res) => {
  res.send({ customers: customers });
});

app.post("/api/customers", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.post("/", (req, res) => {
  res.send("This is a post request");
});

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://dhruvjaiswal400:dHRUv_n9@cluster0.xxq9arr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );

    app.listen(PORT, () => {
      console.log("App listening on port " + PORT);
    });
  } catch (e) {
    console.log(e.message);
  }
};

start();
