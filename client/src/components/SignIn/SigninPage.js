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
    <div>
      <form onSubmit={handleUser}>
        <input
          type="email"
          placeholder="Email"
          label={"email"}
          required={true}
          value={signIn.email}
          onChange={(e) => setSignIn({...signIn, email: e.target.value})}
        />
        <input
          type="password"
          placeholder="password"
          label={"password"}
          required={true}
          onChange={(e) => setSignIn({...signIn, password: e.target.value})}
        />
        <button type="submit">Sign In</button>
      </form>
      {errorMessage !== undefined ? (
        <p style={{color: "red"}}>{errorMessage}</p>
      ) : null}
      <p>If you have no account click here</p>
      <Link to="/createuser">
        <p>Create Account</p>
      </Link>
    </div>
  );
};

export default SigninPage;