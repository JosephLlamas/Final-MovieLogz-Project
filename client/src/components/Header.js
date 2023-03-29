import styled, { ThemeProvider } from "styled-components";
import { Link } from "react-router-dom";
import { BsMinecartLoaded } from "react-icons/bs";
import React from "react";
const Header = () => {
  const theme = {
    border: {
      cart: "none",
    },

    colors: {
      primary: "#fff",
      secondary: "gray",
    },

    fontSizes: {
      small: "5px",
      medium: "30px",
      large: "100px",
    },

    background: {
      cart: "black",
    },
  };

  return (
    <HeaderWrap>
      <Wrapper>
        <HomeLink to={"/"}>
          <CompanyName>MovieLogz</CompanyName>
        </HomeLink>
      </Wrapper>
      <NavWrap>
        <NavItem className="leftBorder" to={"/items/fitness"}>
          TopRated
        </NavItem>
        <NavItem to={""}>Popular</NavItem>
        <NavItem to={""}>BackLog</NavItem>
        <NavItem to={""}>Profile</NavItem>
        <ThemeProvider theme={theme}>
          <NavItem to="" theme={{ border: { cart: "none" } }}>
            <Cart />
          </NavItem>
        </ThemeProvider>
      </NavWrap>
    </HeaderWrap>
  );
};

const HomeLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const Cart = styled(BsMinecartLoaded)``;

const NavItem = styled(Link)`
  padding: 20px 80px;
  text-decoration: none;
  font-family: "nimbus-sans", sans-serif;
  font-weight: 700;
  color: black;
  font-size: 25px;
  border-right: ${({ theme }) => theme.border || "3px solid black"};
  margin: 0px;
  box-sizing: border-box;

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
  border-bottom: 5px solid black;
  margin: 0px;
  background-color: red;
`;

const Wrapper = styled.div`
  border-bottom: 5px solid black;
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
