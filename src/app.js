"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// @ts-nocheck
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Customer = require("./models/customer");
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for POST requests
mongoose.set("strictQuery", false);
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const PORT = process.env.PORT || 3000;
const CONNECTION = process.env.CONNECTION;
app.get("/", (req, res) => {
    res.send("Welcome!!");
});
app.get("/api/customers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield Customer.find();
        res.json({ customers: result });
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
}));
app.get("/api/customers/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log({ requestParams: req.params, requestQuery: req.query });
    // const customerId = req.params.id;
    try {
        const { id: customerId } = req.params; // destructuring
        console.log(customerId);
        const customer = yield Customer.findById(customerId);
        console.log(customer);
        if (!customer) {
            res.status(404).json({ error: "user not found" });
        }
        else {
            res.json({ customer });
        }
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
}));
app.put("/api/customers/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customerId = req.params.id;
        const customer = yield Customer.findOneAndReplace({ _id: customerId }, req.body, { new: true } // if we not pass this property, server return old data after updating in database
        );
        console.log(customer);
        res.json({ customer });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ error: e.message });
    }
}));
app.patch("/api/customers/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customerId = req.params.id;
        const customer = yield Customer.findOneAndUpdate({ _id: customerId }, req.body, { new: true } // if we not pass this property, server return old data after updating in database
        );
        console.log(customer);
        res.json({ customer });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ error: e.message });
    }
}));
app.get("/api/orders/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield Customer.findOne({ "orders._id": req.params.id });
        if (result) {
            res.json({ result });
        }
        else {
            res.status(404).json({ error: "orders not found" });
        }
    }
    catch (e) {
        console.log(e);
        res.status(404).json({ error: e.message });
    }
}));
app.patch("/api/orders/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params);
    try {
        const orderId = req.params.id;
        req.body._id = orderId; // so id wont change
        const result = yield Customer.findOneAndUpdate({ "orders._id": orderId }, { $set: { "orders.$": req.body } }, { new: true });
        console.log(result);
        if (result) {
            res.json({ result });
        }
        else {
            res.status(404).json({ error: "something went wrong" });
        }
    }
    catch (e) {
        console.log(e.message);
        res.json({ error: e.message });
    }
}));
app.delete("/api/customers/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customerId = req.params.id;
        const result = yield Customer.deleteOne({ _id: customerId });
        res.json({ deletedCount: result.deletedCount });
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
}));
app.post("/api/customers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    // this way we can save data from client side
    const customer = new Customer(req.body);
    try {
        yield customer.save();
        res.status(200).json({ customer });
    }
    catch (e) {
        res.status(400).json({ error: e.message });
    }
}));
app.post("/", (req, res) => {
    res.send("This is a post request");
});
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose.connect(CONNECTION);
        app.listen(PORT, () => {
            console.log("App listening on port " + PORT);
        });
    }
    catch (e) {
        console.log(e.message);
    }
});
start();
