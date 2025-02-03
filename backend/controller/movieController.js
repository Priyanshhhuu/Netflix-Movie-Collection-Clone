import { fetchFromTMDB } from "../services/tmdb.service.js";
import asyncHandler from "../Utils/AsyncHandler.js";

export const TrendingMovie = asyncHandler(async (req, res) => {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
    );
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results?.length)];
    res.json({ success: true, content: randomMovie });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
});

export const getMovieTrailers = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
    );
    res.json({ success: true, trailers: data.results });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    return res.status(500).json({ message: "Server Error" });
  }
});

export const getMovieDetails = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`
    );
    res.json({ success: true, details: data });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    return res.status(500).json({ message: "Server Error" });
  }
});

export const getSimilarMovies = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`
    );
    res.json({ success: true, similarMovies: data.results });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
});

export const getMoviesByCategory = asyncHandler(async (req, res) => {
  try {
    const { category } = req.params;
    const data = await fetchFromTMDB(
      ` https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`
    );
    res.json({ success: true, content: data.results });
  } catch (error) {}
});
