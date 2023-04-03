import React from "react";
import styled from "styled-components";
import { UserContext } from "../UserContext";
import {useState, useContext, useEffect} from "react";
import {useNavigate, Link} from "react-router-dom";

const signin = {
  email: "",
  password: "",
};

const SigninPage = () => {
  const navigate = useNavigate();
  const {currentUser, setCurrentUser} = useContext(UserContext);
  const [signIn, setSignIn] = useState(signin);
  const [errorMessage, setErrorMessage] = useState("");

  const handleUser = (event) => {
    event.preventDefault();
    fetch(`/signIn/${signIn.email}/${signIn.password}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 404) {
          setErrorMessage(data.error);
        } else {
          localStorage.setItem("user", JSON.stringify(data.data));
          setCurrentUser(data.data);
          console.log(currentUser);
          navigate("/");
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    if (currentUser !== null) {
      navigate("/signin");
    }
  }, [currentUser, navigate]);

  return (
    <Wrapper>
      <Form onSubmit={handleUser}>
        <Input
          type="email"
          placeholder="Email"
          label={"email"}
          required={true}
          value={signIn.email}
          onChange={(e) => setSignIn({...signIn, email: e.target.value})}
        />
        <Input
          type="password"
          placeholder="password"
          label={"password"}
          required={true}
          onChange={(e) => setSignIn({...signIn, password: e.target.value})}
        />
        <Button type="submit">Sign in</Button>

     
      </Form>
      
<Extra>
        {errorMessage !== undefined ? (
        <p style={{color: "red"}}>{errorMessage}</p>
      ) : null}
      <p>CLICK BELOW TO SIGN UP for FREE!!</p>
      <Link to="/createuser">
        <p>Create Account</p>
      </Link>
     </Extra>
    </Wrapper>
  );
};

export default SigninPage;

const Extra = styled.div`
display:flex;
flex-direction:column;
align-items:center;
`;

const Form = styled.form`
margin-top:50px;
    background: orange;
   border: 1px solid orange;
   display: flex;
   flex-direction: column;
   justify-content: space-around;
   margin: 0 auto;
   max-width: 500px;
   padding: 30px 50px;
`;

const Wrapper = styled.div`
    background: orange;
    height: calc(100vh - 20px);
 
`;

const Input =styled.input`
border: 1px solid #d9d9d9;
   border-radius: 4px;
   box-sizing: border-box;
   padding: 10px;
   width: 100%;
   margin-bottom: 10px;

`;

const Button =styled.button`
background-color: red;
color: black;
font-family: sans-serif;
font-size: 20px;
margin: 20px 0px;
border-radius: 20px;

`;