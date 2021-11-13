const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  parent_user_id: { type: Schema.Types.ObjectId, ref: "User" },
  company_name: { type: String },
  email_id: { type: String, required: true },
  tan_id: { type: String },
});

module.exports = mongoose.model("Client", clientSchema);
