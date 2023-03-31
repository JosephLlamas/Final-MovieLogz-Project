import React from 'react'
import {useContext,useState, useEffect} from "react";
import{Link} from "react-router-dom";
import {UserContext} from "./UserContext";

const Profile = () => {
const {currentUser,setCurrentUser} = useContext(UserContext);
const [characterLimit, setCharacterLimit] =useState(20);
const [text, SetText] = useState("");
const [tweet, setTweet] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    SetText("");
    setCharacterLimit(280);
    fetch("/api/tweet", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: text }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTweet(data.tweet);
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (event) => {
    const inputValue = event.target.value;
    SetText(event.target.value);
    setCharacterLimit(280 - inputValue.length);
  };


  return (
    <div>
<div>
        {!currentUser ? (
          <h1>
            hey
          </h1>
        ) : (
          <>
            {/* <label htmlFor="textBox">
              <img src={currentUser.avatarSrc} />
            </label> */}
            <textarea
              name="UsertextBox"
              placeholder="yooooooo?"
              Rows={6}
              value={text}
              onChange={handleChange}
            ></textarea>
            <div value={characterLimit}>
              {characterLimit}
            </div>
            <button
              disabled={characterLimit < 0 || characterLimit === 280}
              onClick={handleSubmit}
            >
              {""}
              Meow
            </button>
          </>
        )}
      </div>


    </div>
  )
}

export default Profile;