import React from 'react'
import {UserContext} from "./UserContext"
import { useContext, useEffect,useState } from 'react';
import { Link,useParams } from "react-router-dom";

function Backlog() {
  const {currentUser, setCurrentUser } = useContext(UserContext);
  const [data, setData] = useState([]);
 const [refresh,setRefresh] = useState();
 
  // const {id} = useParams()
  

  useEffect(() => {
    fetch(`/viewWatchlist/${currentUser._id}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data.data.watchlist);
        
      })
      .catch((err) => console.error(err));
  }, [refresh]);


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
      
      setRefresh(data.data)
    })
}
console.log(data)
if(!data){
  return <p>Loading</p>
}

  return (
    <div>
      {data.length === 0 ? (
        <h2>EMPTY Click <Link to={'/'}>here</Link> </h2>
      ) : (
        <>
          {data.map((item) => {
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