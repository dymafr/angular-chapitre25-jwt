import express from "express";
import { UserModel } from "../database/models/user.model.js";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";
import { key } from "../keys/index.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email }).exec();
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        const token = jsonwebtoken.sign({}, key, {
          subject: user._id.toString(),
          expiresIn: 3600 * 24 * 30 * 6,
          algorithm: "RS256",
        });
        res.cookie("token", token, { httpOnly: true });
        res.json(user);
      } else {
        res.status(400).json("Mauvais email ou mot de passe");
      }
    } else {
      res.status(400).json("Mauvais email ou mot de passe");
    }
  } catch (e) {
    res.status(400).json("Mauvais email ou mot de passe");
  }
});

export default router;
