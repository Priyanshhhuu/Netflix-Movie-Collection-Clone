import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useContentStore } from "../store/content";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "../components/Navbar";
import ReactPlayer from "react-player";
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from "../utils/Constant";
import { formatReleaseDate } from "../utils/dateFunc";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const WatchPage = () => {
  const { id } = useParams();
  const [trailers, setTrailer] = useState([]);
  const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showArrow, SetShowArrow] = useState(false);
  const [content, setContent] = useState({});
  const [similarContent, setSimilarContent] = useState([]);
  const { contentType } = useContentStore();
  const sliderRef = useRef(null);
  const [currentTab, setCurrentTab] = useState("trailer");

  useEffect(() => {
    const getTrailer = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`);
        setTrailer(res.data.trailers);
      } catch (error) {
        if (error.message.includes("404")) {
          setTrailer(0);
        }
      }
    };
    getTrailer();
  }, [contentType, id]);
  useEffect(() => {
    const getSimilarContent = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/similar`);
        setSimilarContent(res.data?.similarMovies || res.data?.similarTv);
      } catch (error) {
        if (error.message.includes("404")) {
          setSimilarContent([]);
        }
      }
    };
    getSimilarContent();
  }, [contentType, id]);
  useEffect(() => {
    const getContentDetails = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/details`);
        setContent(res.data?.details);
      } catch (error) {
        if (error.message.includes("404")) {
          setContent([]);
        }
      } finally {
        setLoading(false);
      }
    };
    getContentDetails();
  }, [contentType, id]);
  //   arrow movement functionality
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };
  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };
  if (loading) {
    return (
      <Skeleton
        className="min-h-screen w-full   "
        baseColor="#111"
        highlightColor="#000"
        duration={2}
      />
    );
  }
  if (content.length == 0) {
    return (
      <div className="bg-black text-white h-screen">
        <div className="max-w-6xl mx-auto">
          <Navbar />
          <div className="text-center mx-auto px-4 py-8 h-full mt-40">
            <h2 className="text-2xl sm:text-5xl font-bold text-balance">
              Content Not Found 😢
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="mx-auto container px-4 py-8 h-full">
        <Navbar />
        {currentTab == "trailer" && (
          <>
            {" "}
            {trailers.length > 0 && (
              <div className={`flex justify-between items-center mb-4`}>
                <button
                  className={`bg-gray-500/70 hover:bg-gray-500 text-whitte py-2 px-4 rounded ${
                    currentTrailerIdx === 0
                      ? "cursor-not-allowed opacity-50"
                      : ""
                  }`}
                  disabled={currentTrailerIdx === 0}
                  onClick={() => setCurrentTrailerIdx((prev) => prev - 1)}
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  className={`bg-gray-500/70 hover:bg-gray-500 text-whitte py-2 px-4 rounded ${
                    currentTrailerIdx === trailers.length - 1
                      ? "cursor-not-allowed opacity-50"
                      : ""
                  }`}
                  disabled={currentTrailerIdx === trailers.length - 1}
                  onClick={() => setCurrentTrailerIdx((prev) => prev + 1)}
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            )}
            <div className="aspect-video mb-8 p-2 sm:px-10 md:px-32 ">
              {trailers.length > 0 && (
                <ReactPlayer
                  controls={true}
                  width={"100%"}
                  height={"70vh"}
                  className="mx-auto overflow-hidden rounded-lg"
                  url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIdx].key}`}
                />
              )}
              {trailers?.length === 0 && (
                <h2 className="text-xl text-center mt-5">
                  No Trailers available For{" "}
                  <span className="font-bold text-red-600">
                    {content?.title || content?.name}
                  </span>
                  😢
                </h2>
              )}
            </div>
          </>
        )}
        {currentTab == "watch" && (
          <>
            <iframe
              src={`${
                import.meta.env.VITE_VIDSRC
              }/embed/${contentType}?tmdb=${id}`}
              frameborder="0"
              className="w-full h-[70vh]"
            />
          </>
        )}
        <div className="flex flex-col md:flex-row  gap-5 m-5 justify-around items-center mb-5">
          <button
            className={`${
              currentTab == "trailer"
                ? "bg-red-700/50 hover:bg-red-800"
                : "bg-gray-600 hover:bg-gray-700"
            } p-4 rounded-sm w-full`}
            onClick={() => setCurrentTab("trailer")}
          >
            Trailer
          </button>
          <button
            className={`${
              currentTab == "watch"
                ? "bg-red-700/50 hover:bg-red-800"
                : "bg-gray-600 hover:bg-gray-700"
            } p-4 rounded-sm w-full`}
            onClick={() => setCurrentTab("watch")}
          >
            Watch
          </button>
        </div>
        {/* { movie detaile} */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto">
          <div className="mb-4 md:mb-0 ">
            <h2 className="text-5xl font-bold text-balance">
              {content?.title || content?.name}
            </h2>
            <p className="mt-2 text-lg">
              {formatReleaseDate(
                content?.release_date || content?.first_air_date
              )}{" "}
              |{" "}
              {content?.adult ? (
                <span className="text-red-600">18+</span>
              ) : (
                <span className="text-green-600">PG-13</span>
              )}
            </p>
            <p className="mt-4 text-lg">{content?.overview}</p>
          </div>
          <img
            src={ORIGINAL_IMG_BASE_URL + content?.poster_path}
            alt="poster_image"
            className="max-h-[600px] rounded-md"
          />
        </div>
        {similarContent?.length > 0 && (
          <div
            className="mt-12 max-w-5xl mx-auto relative"
            onMouseEnter={() => SetShowArrow(true)}
            onMouseLeave={() => SetShowArrow(false)}
          >
            <h3 className="text-3xl font-bold mb-4">Similar Movie/Tv Show</h3>
            <div
              className="flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group"
              ref={sliderRef}
            >
              {similarContent.map((content) => {
                if (content?.poster_path === null) return null;
                return (
                  <Link
                    key={content.id}
                    to={`/watch/${content?.id}/${
                      content?.title?.split("-").join("") ||
                      content?.name?.split("-").join("")
                    }`}
                    className="w-52 flex-none"
                  >
                    <img
                      src={SMALL_IMG_BASE_URL + content?.poster_path}
                      alt="poster path"
                      className="w-full h-auto rounded-md"
                    />
                    <h4 className="mt-2 text-lg font-semibold">
                      {content?.title || content?.name}{" "}
                    </h4>
                  </Link>
                );
              })}
            </div>
            {showArrow && (
              <>
                <button
                  className="absolute top-1/2 -translate-y-1/2 left-0 md:left-24 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10"
                  onClick={scrollLeft}
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  className="absolute top-1/2 -translate-y-1/2 right-0 md:right-24 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10"
                  onClick={scrollRight}
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchPage;
