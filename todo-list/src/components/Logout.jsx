import { useNavigate} from "react-router-dom";
import axios from "axios";
import React from "react";
import { useAuthContext } from "../context/authContext";

function LoginForm() {
  const { setAuthorized } = useAuthContext();
  const navigate = useNavigate();


  const handleLogout = async (event) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_ENDPOINT}api/logout`,
        {
          credentials: true,
        }
      );

      if (response.status === 200) {
        setAuthorized(false);
        localStorage.removeItem("isAuthenticated")
        navigate("/");
      }
    } catch (error) {
      console.error(
        "Logout failed:",
        console.log(error)
        );
    }
  };

  return (
      <button className="logout-button" onClick={handleLogout}>Logout</button>

  );
}

export default LoginForm;
