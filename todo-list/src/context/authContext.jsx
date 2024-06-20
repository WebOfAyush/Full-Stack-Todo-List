import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}
export function AuthContextProvider({ children }) {
  const [authorized, setAuthorized] = useState(
    localStorage.getItem("isAuthenticated")
  );
  return (
    <AuthContext.Provider value={{ authorized, setAuthorized }}>
      {children}
    </AuthContext.Provider>
  );
}
