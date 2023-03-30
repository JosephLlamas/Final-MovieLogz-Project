import { useState, createContext } from "react";
import React from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const getStorage = JSON.parse(window.localStorage.getItem("user"));
    
      if (getStorage) {
        return getStorage;
      } else {
        return null;
      }
    
  });
  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
}; 