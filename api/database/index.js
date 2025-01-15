import { mongoose } from "mongoose";

mongoose
  .connect(
    "mongodb+srv://jean:123@cluster0.urpjt.gcp.mongodb.net/angularjwt?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("CONNEXION DB OK !");
  })
  .catch((e) => {
    console.log("CONNEXION DB FAIL : ", e);
  });
