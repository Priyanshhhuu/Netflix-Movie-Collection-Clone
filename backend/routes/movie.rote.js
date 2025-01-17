import express from "express";
import {
  getMovieDetails,
  getMoviesByCategory,
  getMovieTrailers,
  getSimilarMovies,
  TrendingMovie,
} from "../controller/movieController.js";

const movieRoute = express.Router();

movieRoute.route("/trending").get(TrendingMovie);
movieRoute.route("/:id/trailers").get(getMovieTrailers);
movieRoute.route("/:id/details").get(getMovieDetails);
movieRoute.route("/:id/similar").get(getSimilarMovies);
movieRoute.route("/:category").get(getMoviesByCategory);

export default movieRoute;
