import { fetchFromTMDB } from "../services/tmdb.service.js";
import asyncHandler from "../Utils/AsyncHandler.js";

export const TrendingTv = asyncHandler(async (req, res) => {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US"
    );
    const randomTv =
      data.results[Math.floor(Math.random() * data.results?.length)];
    res.json({ success: true, content: randomTv });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
});
export const getTvTrailers = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
    );
    res.json({ success: true, trailers: data.results });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    return res.status(500).json({ message: "Server Error" });
  }
});
export const getTvDetails = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`
    );
    res.json({ success: true, details: data });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    return res.status(500).json({ message: "Server Error" });
  }
});
export const getSimilarTv = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`
    );
    res.json({ success: true, similarTv: data.results });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
});
export const getTvByCategory = asyncHandler(async (req, res) => {
  try {
    const { category } = req.params;
    const data = await fetchFromTMDB(
      ` https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`
    );
    res.json({ success: true, content: data.results });
  } catch (error) {}
});
