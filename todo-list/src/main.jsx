import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  AuthContextProvider,
} from "./context/authContext.jsx";
import { UserIdContextProvider } from "./context/UserContext.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <UserIdContextProvider>
        <App className="App" />
      </UserIdContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
