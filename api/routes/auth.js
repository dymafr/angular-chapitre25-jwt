import express from "express";
import { UserModel } from "../database/models/user.model.js";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";
import { key, keyPub } from "../keys/index.js";

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
        return res.json(user);
      } else {
        return res.status(400).json("Mauvais email ou mot de passe");
      }
    } else {
      return res.status(400).json("Mauvais email ou mot de passe");
    }
  } catch (e) {
    return res.status(400).json("Mauvais email ou mot de passe");
  }
});

router.get("/current", async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    try {
      const decodedToken = jsonwebtoken.verify(token, keyPub);
      const currentUser = await UserModel.findById(decodedToken.sub)
        .select("-__v -password")
        .exec();
      if (currentUser) {
        return res.json(currentUser);
      } else {
        return res.json(null);
      }
    } catch (e) {
      return res.json(null);
    }
  } else {
    return res.json(null);
  }
});

export default router;
