import React from 'react'
import {UserContext} from "./UserContext"
import { useContext, useEffect } from 'react';
import { Link,useParams } from "react-router-dom";



function Backlog() {
  const {currentUser, setCurrentUser } = useContext(UserContext);
  
  // const {id} = useParams()

  const handleClickButtonDelete = (id) => {
    // alert(id)
    fetch(`/deleteMovie/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: currentUser._id
      }),
      
    }).then((result) => result.json())
    .then((data) => {
      console.log(data)
      setCurrentUser(data.data)
    })
}


  return (
    <div>
      {currentUser.watchlist.length === 0 ? (
        <h2>Looks like your watchlist is empty, Click <Link to={'/'}>here</Link> if you would like to keep shoppping ! </h2>
      ) : (
        <>
          {currentUser.watchlist.map((item) => {
            return (
              <div>
                <p>{item.id}</p>
              <h1>{item.title}</h1>
              <img
                    src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}
                    
                  />
              <button onClick={() => handleClickButtonDelete(item.id)}>DONE WATCHING</button>
              </div>
            )
          })}
        </>
      )}
    </div>
  )
}

export default Backlog;