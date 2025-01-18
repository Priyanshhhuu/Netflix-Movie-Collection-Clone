import User from "../model/user.model.js";
import { fetchFromTMDB } from "../services/tmdb.service.js";
import asyncHandler from "../Utils/AsyncHandler.js";

export const searchPerson = asyncHandler(async (req, res) => {
  try {
    const { query } = req.params;
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
    );
    if (response.results.length === 0) {
      return res.status(404).json({ message: "No results found" });
    }
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].profile_path,
          title: response.results[0].name,
          searchType: "person",
          createdAt: new Date(),
        },
      },
    });
    res.json({ success: true, results: response.results });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
});
export const searchMovie = asyncHandler(async (req, res) => {
  try {
    const { query } = req.params;
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    );
    if (response.results.length === 0) {
      return res.status(404).json({ message: "No results found" });
    }
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].poster_path,
          title: response.results[0].original_title,
          searchType: "movie",
          createdAt: new Date(),
        },
      },
    });
    res.json({ success: true, results: response.results });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
});
export const searchTV = asyncHandler(async (req, res) => {
  try {
    const { query } = req.params;
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
    );
    if (response.results.length === 0) {
      return res.status(404).json({ message: "No results found" });
    }
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].poster_path,
          title: response.results[0].original_name,
          searchType: "tv",
          createdAt: new Date(),
        },
      },
    });
    res.json({ success: true, results: response.results });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
});

export const getSearchHistory = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: "searchHistory",
      options: { sort: { createdAt: -1 } },
    });
    res.json({ success: true, searchHistory: user.searchHistory });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
});

export const removeItemFromSearchHistory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    await User.findByIdAndUpdate(req.user._id, {
      $pull: { searchHistory: { id: Number(id) } },
    });
    res.json({ success: true, message: "Item removed from search history" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
});
