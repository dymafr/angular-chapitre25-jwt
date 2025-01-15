import express from "express";
import { UserModel } from "../database/models/user.model.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/", async (req, res) => {
  const { email, username, password } = req.body;
  const user = new UserModel({
    email,
    username,
    password: await bcrypt.hash(password, 8),
  });

  try {
    const newUser = await user.save();
    return res.json(newUser);
  } catch (e) {
    if (e.code === 11000) {
      return res.status(400).json("adresse email déjà utilisée");
    }
    return res.status(400).json("oops une erreur est survenue");
  }
});

export default router;
