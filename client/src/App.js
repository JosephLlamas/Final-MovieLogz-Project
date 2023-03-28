
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Homepage from "./components/Homepage";
import Signin from "./components/SignIn/Signin";
const App = () => {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Homepage />} />
          <Route path="/signin" element={ <Signin />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App; 



