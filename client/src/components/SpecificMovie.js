import React from 'react'
import {useState, useEffect} from "react";
import { useParams } from 'react-router-dom';

const SpecificMovie = () => {
  const [movie, setMovie] = useState([]);
  const {movieId} = useParams();

  useEffect(() => {
    fetch(`/movieById/${movieId}`)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data.data);
        console.log(data);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div>
      {!movie ? (
        <p>loading</p>
        ) : (
          <div>
            {movie.title}
            <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                  
                  />
          </div>
        )}
    </div>
  )
}

export default SpecificMovie;