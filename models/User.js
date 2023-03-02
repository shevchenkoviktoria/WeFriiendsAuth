const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  userId: {
    type: String,
    unique: true,
    required: true
  },
  password: String,
  googleId: String,
  status: {
    type: String,
    enum: ["Pending", "Active"],
    default: "Pending",
  },
  confirmationCode: {
    type: String,
    unique: true,
  }
});

mongoose.model("users", userSchema);
