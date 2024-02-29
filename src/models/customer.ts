import { Schema, model } from "mongoose";
const customerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  industry: String,
  orders: [{ description: String, amountInCents: Number }],
});

export const Customer = model("customer", customerSchema);
// in mongodb the table name is always in lowercase and pluralized
// it doesnt matter if you write customer
