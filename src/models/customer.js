const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  industry: String,
});

module.exports = mongoose.model("Customer", customerSchema);
// in mongodb the table name is always in lowercase and pluralized
// it doesnt matter if you write customer