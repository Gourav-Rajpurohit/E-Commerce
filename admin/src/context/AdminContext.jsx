import React from "react";
import { createContext } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const currency = "$";

  const value = {
    backendUrl,
    currency,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
