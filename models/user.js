const mongoose = require("mongoose"); // Import mongoose
const mongooseDelete = require("mongoose-delete"); // Import mongoose-delete

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: String,
      required: true,
    },
    emailAddress: {
      type: String,
      required: true,
    },
    identityNumber: {
      type: String,
      required: true,
    },
  },
  {
    // Enable timestamps
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    toJSON: { getters: true }, // Enable getter
  }
);

// Enable soft delete
userSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("user", userSchema); // Export user models
