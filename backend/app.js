import express from "express";
import authRoute from "./routes/auth.route.js";
import movieRoute from "./routes/movie.rote.js";
import tvRoute from "./routes/tv.routes.js";
import cookieParser from "cookie-parser";
import { protectRoute } from "./middleware/protectRoute.js";
import SearchRoute from "./routes/search.routes.js";

import path from "path";

const app = express();

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

// Serve static files from the frontend/dist directory in production mode

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/movie", protectRoute, movieRoute);
app.use("/api/v1/tv", protectRoute, tvRoute);
app.use("/api/v1/search", protectRoute, SearchRoute);

export default app;
