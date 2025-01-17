import { fetchFromTMDB } from "../services/tmdb.service.js";
import asyncHandler from "../Utils/AsyncHandler.js";

export const TrendingMovie = asyncHandler(async (request, res) => {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
    );
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results?.length)];
    res.json({ success: true, content: randomMovie });
  } catch (error) {
    console.log("Error in Trending Movie", error);
    return res.status(500).json({ message: "Server Error" });
  }
});
