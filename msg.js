
const { Schema, model } = require("mongoose");
const MessageSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);
module.exports = model("Message", MessageSchema);
