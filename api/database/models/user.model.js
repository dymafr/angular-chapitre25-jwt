import { mongoose } from "mongoose";

const userSchema = mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
});

export const UserModel = mongoose.model("user", userSchema);
