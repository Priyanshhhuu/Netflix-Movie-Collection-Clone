import express from "express";
import {
  getSearchHistory,
  removeItemFromSearchHistory,
  searchMovie,
  searchPerson,
  searchTV,
} from "../controller/searchController.js";

const SearchRoute = express.Router();

SearchRoute.route("/person/:query").get(searchPerson);
SearchRoute.route("/movie/:query").get(searchMovie);
SearchRoute.route("/tv/:query").get(searchTV);

SearchRoute.route("/history").get(getSearchHistory);
SearchRoute.route("/history/:id").delete(removeItemFromSearchHistory);

export default SearchRoute;
