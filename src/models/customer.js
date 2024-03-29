"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const customerSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    industry: String,
    orders: [{ description: String, amountInCents: Number }],
});
const Customer = (0, mongoose_1.model)("customer", customerSchema);
// in mongodb the table name is always in lowercase and pluralized
// it doesnt matter if you write customer
const c = new Customer({
    name: "test",
    industry: "test",
});
console.log(c.name);
exports.default = Customer;
