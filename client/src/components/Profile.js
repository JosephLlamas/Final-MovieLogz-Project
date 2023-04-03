import React from "react";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

const Profile = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [characterLimit, setCharacterLimit] = useState(20);
  const [text, SetText] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [info, setInfo] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    SetText("");
    setCharacterLimit(280);
    fetch("/comment", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: currentUser._id,
        comment: text
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setRefresh(!refresh)
      })
      .catch((error) => console.log(error));
  };
  

  const handleChange = (event) => {
    const inputValue = event.target.value;
    SetText(event.target.value);
    setCharacterLimit(280 - inputValue.length);
  };

  useEffect(() => {
    fetch(`/getComments/${currentUser._id}`)
      .then((response) => response.json())
      .then((data) => {
        setInfo(data.data);
        console.log(data.data.feedback);
      })
      .catch((err) => console.error(err));
  }, [refresh]);

  const handleDelete = (id) => {
    // alert(id);
    fetch(`/deleteComment/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: currentUser._id,
      }),
    })
      .then((result) => result.json())
      .then((data) => {
        setRefresh(data.data);
      });
  };

  return (
    <div>
      <div>
        {!currentUser ? (
          <h1>hey</h1>
        ) : (
          <>
            <textarea
              name="UsertextBox"
              placeholder="yooooooo?"
              Rows={6}
              value={text}
              onChange={handleChange}
            ></textarea>
            <div value={characterLimit}>{characterLimit}</div>
            <button
              disabled={characterLimit < 0 || characterLimit === 280}
              onClick={handleSubmit}
            >
              {""}
              COMMENTTTTTTTTTTTTT
            </button>
          </>
        )}
      </div>
      {info.feedback && <div>
        {info.feedback.map((item)=>{
          return (
            <h1>{item.comment}</h1>
          )
        })}
        </div>}
    </div>
  );
};

export default Profile;
