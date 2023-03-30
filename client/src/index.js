import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { UserProvider } from "./components/UserContext";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider value={{}}>
      <App />
    </UserProvider>
    ,
  </React.StrictMode>
);
