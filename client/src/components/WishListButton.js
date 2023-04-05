import { AiTwotoneFire } from "react-icons/ai";
import React from "react";
import {useState, useContext} from "react";

import { UserContext } from "./UserContext";

const WatchlistButton = ({item}) => {
  const {currentUser, setCurrentUser} = useContext(UserContext);
  const [message, setMessage] = useState("");

  const handleClick = (user_id, item) => {
    const itemArr = [...currentUser.watchlist];
    itemArr.push(item);

    fetch(`/watchlist`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user_id,
        watchlistArr: itemArr,
        actualItem: item,
      }),
    })
      .then((result) => result.json())
      .then((data) => {
        if (data.status === 404) {
          setMessage(data.error);
        } else if (data.status === 200) {
          setCurrentUser({...currentUser, watchlist: itemArr});
          setMessage(data.message);
        }
      });
  };

  return (
    <div>
      <AiTwotoneFire onClick={() => handleClick(currentUser._id, item)}>
        Add To Watchlist/backlog
      </AiTwotoneFire>
      {message !== null ? <p>{message} </p> : null}
    </div>
  );
};

export default WatchlistButton; 