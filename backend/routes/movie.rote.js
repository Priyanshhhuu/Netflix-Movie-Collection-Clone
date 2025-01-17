import express from "express";
import { TrendingMovie } from "../controller/movieController.js";

const movieRoute = express.Router();

movieRoute.route("/trending").get(TrendingMovie);

export default movieRoute;
