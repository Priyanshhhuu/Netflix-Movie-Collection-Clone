import express from "express";
import {
  getSimilarTv,
  getTvByCategory,
  getTvDetails,
  getTvTrailers,
  TrendingTv,
} from "../controller/tvController.js";

const tvRoute = express.Router();

tvRoute.route("/trending").get(TrendingTv);
tvRoute.route("/:id/trailers").get(getTvTrailers);
tvRoute.route("/:id/details").get(getTvDetails);
tvRoute.route("/:id/similar").get(getSimilarTv);
tvRoute.route("/:category").get(getTvByCategory);

export default tvRoute;
