
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Homepage from "./components/Homepage";
import Signin from "./components/SignIn/Signin";
import Header from "./components/Header";


const App = () => {
  
  return (
    <>
      <BrowserRouter>

      <Header/>

        <Routes>
          <Route path="/" element={ <Homepage />} />
          <Route path="/signin" element={ <Signin />} />

        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App; 



