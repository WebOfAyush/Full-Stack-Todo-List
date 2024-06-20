import { createContext, useContext, useState } from "react";

const UserIdContext = createContext();
export function useUserIdContext() {
  return useContext(UserIdContext);
}export function UserIdContextProvider({ children }) {
  const [UserId, setUserId] = useState(localStorage.getItem("UserId"));
  return (
    <UserIdContext.Provider value={{ UserId, setUserId }}>
      {children}
    </UserIdContext.Provider>
  );
}

