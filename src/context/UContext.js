import React, { createContext, useContext, useState } from 'react';

const MyContext = createContext();

export const UContext= ({ children }) => {
  const [globalState, setGlobalState] = useState({
    currentTab: 0,
    sceneObjects: [
      {
        name: "Example",
        type: "block",
        object: null
      },
      {
        name: "Example",
        type: "block",
        object: null
      },
      {
        name: "Example",
        type: "block",
        object: null
      }
    ]
  });

  return (
    <MyContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </MyContext.Provider>
  );
};

export const useGlobalState = () => {
  return useContext(MyContext);
};
