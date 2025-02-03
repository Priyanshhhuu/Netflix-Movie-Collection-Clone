import app from "./app.js";
import connectDb from "./db/index.js";
import dotenv from "dotenv";

dotenv.config();
connectDb()
  .then(() => {
    app.on("error", (err) => {
      throw err;
    });
    app.listen(process.env.PORT || 8000, () => {
      console.log(
        `Server is listening at localhost:${process.env.PORT || 8000}`
      );
    });
  })
  .catch((err) => {
    console.log("MOGODB connection failed!!", err);
  });
