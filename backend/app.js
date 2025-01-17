import express from "express";
import authRoute from "./routes/auth.route.js";
import movieRoute from "./routes/movie.rote.js";
import tvRoute from "./routes/tv.routes.js";
import cookieParser from "cookie-parser";
import { protectRoute } from "./middleware/protectRoute.js";
import SearchRoute from "./routes/search.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/movie", protectRoute, movieRoute);
app.use("/api/v1/tv", protectRoute, tvRoute);
app.use("/api/v1/search", protectRoute, SearchRoute);

export default app;
