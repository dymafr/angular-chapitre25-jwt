import "./database/index.js";
import express from "express";
import cookie from "cookie-parser";
import router from "./routes/index.js";

const app = express();

app.use(cookie());
app.use(express.json());
app.use(router);

app.all("*all", (req, res) => {
  return res.status(404).end();
});

app.listen(3001);
