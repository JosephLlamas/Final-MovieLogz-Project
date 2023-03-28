import { useState, useEffect } from "react";
import React from "react";
const Homepage = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    
    fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=79dc84aa2584757f2f9c4044429e028b&language=en-US&page=1")
      .then(response => response.json())
      .then((data) => {
        setData(data.results);
        console.log(data.results)
      })
      .catch(err => console.error(err));
  }, [])

    return (
      <div>
        {!data ? (
          <p>loading</p>
        ) : (
        <>
        {data.map((items) => {
          return (
            <div key={items.id}>
              <p>{items.title}</p>
              
              <img src={`https://image.tmdb.org/t/p/w500/${items.backdrop_path}`} alt={items.title} />
              <img src={`https://image.tmdb.org/t/p/w500/${items.poster_path}`} alt={items.title} />

            

            </div>
          )
        })}
        </>
        )}
      </div>
    )
}

export default Homepage; 