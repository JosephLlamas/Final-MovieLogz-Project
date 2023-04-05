import React from "react";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import styled, {keyframes} from "styled-components"
import { CiCircleRemove } from "react-icons/ci";

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
        
      })
      .catch((err) => console.error(err));
  }, [refresh]);

  const handleDelete = (id) => {
    
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
    <Wrapper>
      <Container>
        {!currentUser ? (
          <h1> Click <Link to={"/"}>here</Link>{" "} to return to homepage</h1>
        ) : (
          <>
            <TextArea
              name="UsertextBox"
              placeholder="Leave a note for your movie backlogs"
              Rows={6}
              value={text}
              onChange={handleChange}
            ></TextArea>
            
            <Button1
              disabled={characterLimit < 0 || characterLimit === 280}
              onClick={handleSubmit}
            >
              
              <Span1>Notes</Span1>
            </Button1>
          </>
        )}
      </Container>
      {info.feedback && <div>
        {info.feedback.map((item)=>{
          return (
            <CommentContainer key={item.commentID}>

            <Comment>{item.comment}</Comment>

            <Icon><CiCircleRemove onClick={() => handleDelete(item.commentID)}>REMOVE</CiCircleRemove></Icon>

            </CommentContainer>
          
          )
        })}
        
        </div>}
    </Wrapper>
  );
};

export default Profile;

const Icon =styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: auto;
`;



const Span1 = styled.div`
margin: 0 auto;

`;

const Container = styled.div`
padding-top: 50px;
padding-bottom:50px;
display:flex;
flex-direction:column;

`;

const Wrapper =styled.div`
display:flex;
flex-direction:column;
flex-wrap: wrap;
align-content:center;

`;

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0%);
  }
`;

const CommentContainer = styled.div`

display:flex;
justify-content:center;
gap: 100px;
padding-top:50px;

  background-color: #f2f2f2;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;

  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  animation: ${slideIn} 1s ease-out forwards;

  z-index: 1; 

 
`;

const Comment = styled.p`
display:flex;

`;

const TextArea = styled.textarea`
width: 604px;
  height: 90px;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;

`;

const Button1 = styled.button`
display:flex;
font-weight:bold;
align-items: center;
  background-color: #fee6e3;
  border: 2px solid #111;
  border-radius: 8px;
  box-sizing: border-box;
  color: #111;
  cursor: pointer;
  display: flex;
  font-family: Inter,sans-serif;
  font-size: 16px;
  height: 48px;

`;

