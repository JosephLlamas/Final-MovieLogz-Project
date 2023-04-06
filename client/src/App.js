import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Homepage from "./components/Homepage";
import SigninPage from "./components/SignIn/SigninPage";
import Header from "./components/Header";
import TopRated from "./components/toprated";
import CreateUser from "./components/SignIn/CreateUser";
import SpecificMovie from "./components/SpecificMovie";
import { GlobalStyle } from "./components/GlobalStyles";
import Backlog from "./components/Backlog";
import Profile from "./components/Profile";
import Nowplaying from "./components/nowPlaying";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <GlobalStyle />
        <Header />

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/toprated" element={<TopRated />} />
          <Route path="/nowplaying" element={<Nowplaying />} />
          <Route path="/createUser" element={<CreateUser />} />
          <Route path="/movie/:movieId" element={<SpecificMovie />} />
          <Route path="/backlog" element={<Backlog />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
