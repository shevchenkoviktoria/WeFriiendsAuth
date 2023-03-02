const mongoose = require("mongoose");
const Schema = mongoose.Schema;

index[userSchema.options.discriminatorKey] = 1;
userSchema.index(index, { unique: true, sparse: true });

const userSchema = new Schema({
  userId: {
    type: String,
    unique: true,
    required: true
  },
  password: String,
  status: {
    type: String,
    enum: ["Pending", "Active"],
    default: "Pending",
  },
  confirmationCode: {
    type: String,
    unique: true,
    index: { unique: true, sparse: true }
  }
});

mongoose.model("users", userSchema);
