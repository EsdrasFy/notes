import React, { createContext} from "react";

const AllContexts = createContext();

const AllProvider = ({ children }) => {
  return (
    <AllContexts.Provider
      value={{ }}
    >
      {children}
    </AllContexts.Provider>
  );
};

export { AllContexts, AllProvider };
