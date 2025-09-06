

import React, { useEffect, useState } from "react";
import axios from "../../Utils/axios";
import requests from "../../Utils/requests";
import "./Banner.css";


const Banner = () => {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const request = await axios.get(requests.fetchNetflixOriginals);
        setMovie(
          request.data.results[
            Math.floor(Math.random() * request.data.results.length)
          ]
        );
      } catch (error) {
        console.error("Axios error:", error);
      }
    })();
  }, []);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <header
      className="Banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: movie?.backdrop_path
          ? `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`
          : "url('/fallback-image.jpg')",
        backgroundPosition: "center center",
      }}
    >
      <div className="Banner_contents">
        <h1 className="Banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="Banner_buttons">
          <button className="Banner_button play">Play</button>
          <button className="Banner_button">My List</button>
        </div>
        <h1 className="Banner_description">{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className="Banner_FadeBottom" />
    </header>
  );
};

export default Banner;


