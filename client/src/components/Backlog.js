import React from "react";
import { UserContext } from "./UserContext";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "./Loading";

const Backlog = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [info, setInfo] = useState([]);
  const [refresh, setRefresh] = useState();

  // const {id} = useParams()

  useEffect(() => {
    fetch(`/viewWatchlist/${currentUser._id}`)
      .then((response) => response.json())
      .then((data) => {
        setInfo(data.data);
        console.log(data.data.watchlist);
      })
      .catch((err) => console.error(err));
  }, [refresh]);



  const handleClickButtonDelete = (id) => {
    // alert(id);
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
  };

  if (!info.watchlist) {
    return <Loading/>;
  }
  // console.log(data)
  return (
    <div>
      {info.watchlist.length === 0 ? (
        <h2>
          EMPTY Click <Link to={"/"}>here</Link>{" "}
        </h2>
      ) : (
        <>
          {info.watchlist.map((item) => {
            return (
              <div key={item.id}>
                <h1>{item.title}</h1>
                <h1>{item.id}</h1>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}
                  alt={item.title || 'Movie Poster'}
                />
              
              <button onClick={() => handleClickButtonDelete(item.id)}>
                DONE WATCHING
              </button>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Backlog;
