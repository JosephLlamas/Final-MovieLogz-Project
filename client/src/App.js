
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Homepage from "./components/Homepage";

import Header from "./components/Header";
import TopRated from "./components/toprated";
import CreateUser from "./components/SignIn/CreateUser";

const App = () => {
  
  return (
    <>
      <BrowserRouter>

      <Header/>

        <Routes>
          <Route path="/" element={ <Homepage />} />
          
          <Route path="/toprated" element={ <TopRated/>} />
          <Route path="/createUser" element={ <CreateUser/>} />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App; 



