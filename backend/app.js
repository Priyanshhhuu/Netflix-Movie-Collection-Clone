import express from "express";
import authRoute from "./routes/auth.route.js";
import movieRoute from "./routes/movie.rote.js";

const app = express();

app.use(express.json());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/movie", movieRoute);
export default app;
