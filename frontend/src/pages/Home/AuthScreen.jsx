import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const AuthScreen = () => {
  const [email, setEmail] = useState("");
  return (
    <div className=" hero-bg relative">
      {/* Navbar */}
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4 pb-10">
        <img
          src="/assets/netflix-logo.png"
          alt="Netflix logo"
          className="w-32 md:w-52"
        />
        <Link to={"/login"} className="text-white bg-red-600 py-1 px-2 rounded">
          Sign In
        </Link>
      </header>

      {/* hero section */}
      <div className="flex flex-col items-center justify-center text-center py-40 text-white max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Unlimited movies, TV shows, and more
        </h1>
        <p className="text-lg mb-4">Watch annywhere. Cancel anytime</p>
        <p className="mb-4">
          Ready to watch? Enter Your email to create or restart your membership.
        </p>
        <form className="flex flex-col md:flex-row gap-4 w-1/2">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email address"
            className="p-2 flex-1 bg-black/80 border border-gray-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="bg-red-600 text-xl lg:text-2xl px-2 lg:px-6 py-1 md:py-2 rounded flex justify-center items-center">
            Get Started
            <ChevronRight className="size-8 md:size-10" />
          </button>
        </form>
      </div>
      {/* separator */}
      {/* <div className="h-2 w-full bg-[#232323]" aria-hidden="true" /> */}
      <div className="default-ltr-cache-dulgtd ">
        {" "}
        <div>
          <div className="default-ltr-cache-1f97ztc"></div>
        </div>
        <div className="default-ltr-cache-jtcpfi"></div>
      </div>
      {/* 1st Section */}
      <div className="py-10 bg-black text-white">
        <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2">
          {/* left */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Enjoy on Your TV
            </h2>
            <p className="text-lg md:text-xl">
              watch on Smart TVs, PlayStation, Xbox, chromecast, apple TV,
              Blu-ray players,and more.
            </p>
          </div>
          {/* Right */}
          <div className="flex-1 relative">
            <img
              src="/assets/tv.png"
              alt="tv image"
              className="mt-4 z-20 relative"
            />
            <video
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 z-10"
              playsInline
              autoPlay
              muted
              loop
            >
              <source src="/assets/hero-vid.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
      {/* separator */}
      <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />
      {/* 2nd Section */}
      <div className="py-10 bg-black text-white ">
        <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2">
          {/* Left */}
          <div className="flex-1">
            <div className="relative">
              <img src="/assets/stranger-things-lg.png" alt="" />
            </div>
          </div>
          {/* Right */}
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
