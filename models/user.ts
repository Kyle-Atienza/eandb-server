import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    defaults: {
      address: {
        shipping: { type: mongoose.Types.ObjectId, ref: "OrderAddress" },
        billing: { type: mongoose.Types.ObjectId, ref: "OrderAddress" },
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model<UserDoc>("User", UserSchema);
