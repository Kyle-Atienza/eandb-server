"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
/* declare global {
  interface UserDoc extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    name: String;
    email: String;
    password: String;
  }
} */
const UserSchema = new mongoose_1.default.Schema({
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
}, {
    timestamps: true,
});
module.exports = mongoose_1.default.model("User", UserSchema);
