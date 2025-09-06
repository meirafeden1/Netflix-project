import React, { useEffect, useState } from "react";
import axios from "../../../Utils/axios";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";
import "./row.css";

const Row = ({ title, fetchUrl, isLargeRow = false }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results || []);
    }
    fetchData();
  }, [fetchUrl]);

  const base_url = "https://image.tmdb.org/t/p/original/";

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(
        movie?.name ||
          movie?.title ||
          movie?.original_name ||
          movie?.original_title ||
          ""
      )
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log("Trailer not found:", error));
    }
  };

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies?.map((movie) => {
          const imagePath = isLargeRow
            ? movie.poster_path
            : movie.backdrop_path;
          return (
            imagePath && (
              <img
                key={movie.id}
                className={`row_poster ${isLargeRow ? "row_posterLarge" : ""}`}
                src={`${base_url}${imagePath}`}
                alt={movie.name || movie.title}
                onClick={() => handleClick(movie)}
              />
            )
          );
        })}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;
