import { mongoose } from "mongoose";

const userSchema = mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

export const UserModel = mongoose.model("user", userSchema);
