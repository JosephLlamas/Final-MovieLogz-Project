
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { UserContext } from "./context/UserContext";
// import { useContext } from "react";
import Homepage from "./components/Homepage";

const App = () => {
  // const { currentUser, setCurrentUser } = useContext(UserContext);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Homepage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App; 



