import styled, { ThemeProvider } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import { GoSignOut } from "react-icons/go";
import { BsFillEmojiSunglassesFill } from "react-icons/bs";

import React from "react";

const Header = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const theme = {
    colors: {
      primary: "#fff",
      secondary: "gray",
    },

    fontSizes: {
      small: "5px",
      medium: "30px",
      large: "100px",
    },
  };

  const navigate = useNavigate();

  const handleChange = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
    navigate("/signin");
  };

  
  return (
    <HeaderWrap>
      <Wrapper>
        <HomeLink to={"/"}>
          <CompanyName>MovieLogz</CompanyName>
        </HomeLink>
      </Wrapper>
      <NavWrap>
        <NavItem className="leftBorder" to={"/topRated"}>
          TopRated
        </NavItem>
        <NavItem to={"/nowPlaying"}>Now Playing</NavItem>
        <NavItem to={"/backlog"}>BackLog</NavItem>

        {!currentUser ? (
          <NavItem to={"/signin"}>Profile</NavItem>
        ) : (
          <>
            <NavItem to={"/profile"}>{currentUser.firstName}</NavItem>
          </>
        )}
        {currentUser ? (
          <NavItem onClick={handleChange}>
            <GoSignOut />
          </NavItem>
        ) : (
          <ThemeProvider theme={theme}>
            <NavItem to="/createUser">
              <BsFillEmojiSunglassesFill /> Sign up
            </NavItem>
          </ThemeProvider>
        )}
      </NavWrap>
    </HeaderWrap>
  );
};

const HomeLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const NavItem = styled(Link)`
  padding: 20px 80px;
  text-decoration: none;
  font-family: "nimbus-sans", sans-serif;
  font-weight: 700;
  color: black;
  font-size: 25px;

  margin: 0px;
  box-sizing: border-box;
  border-right: ${({ theme }) => theme.border || "3px solid black"};
  .leftBorder {
    border-left: 3px solid black;
  }

  :hover {
    background-color: black;
    color: #fff;
    transition: all 0.7s ease-in-out;
  }
`;

const NavWrap = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  border: 5px solid black;
  border-radius:30px;
  margin: 0px;
  background-color: #800020;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: orange;
`;

const CompanyName = styled.h1`
  font-family: "nimbus-sans", sans-serif;
  font-weight: 900;
  font-style: italic;
  font-size: 200px;
  letter-spacing: 10px;
`;

const HeaderWrap = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export default Header;
