import mongoose from "mongoose";

declare global {
  interface UserDoc extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    name: String;
    email: String;
    password: String;
  }
}

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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model<UserDoc>("User", UserSchema);
