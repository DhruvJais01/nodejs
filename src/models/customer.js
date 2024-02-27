const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema({
  name: String,
  industry: String,
});

module.exports = mongoose.model("Customer", customerSchema);
// in mongodb the collection name is always in lowercase and pluralized
// it doesnt matter if you write customer
