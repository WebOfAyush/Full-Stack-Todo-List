import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import Nav from "./nav";
import { useAuthContext } from "../context/authContext";
import { useUserIdContext } from "../context/UserContext";
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"


function LoginForm() {
  const { setAuthorized } = useAuthContext();
  const {setUserId} = useUserIdContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_ENDPOINT}api/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
        
      // if (response.status == 201) {
      //   setUserId(response.data.User._id)
      // }
      if (response.status === 200) {
        setUserId(response.data.User._id)
        localStorage.setItem('UserId', response.data.User._id)
        setAuthorized(true);
        Toastify({
          text: "Login Successfull",
          duration: 2000,
          newWindow: true,
          close: true,
          gravity: "top", // `top` or `bottom`
          position: "left", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
          onClick: function(){}
        }).showToast();
        localStorage.setItem('isAuthenticated', true)
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        Toastify({
          text: "Invalid Password",
          duration: 2000,
          newWindow: true,
          close: true,
          gravity: "top", // `top` or `bottom`
          position: "left", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
          onClick: function(){}
        }).showToast();
      }
      if (error.response && error.response.status === 404) {
        Toastify({
          text: "User Not Found",
          duration: 2000,
          newWindow: true,
          close: true,
          gravity: "top", // `top` or `bottom`
          position: "left", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
          onClick: function(){}
        }).showToast();
      }else{

        console.error(
          "Login failed:",
        error.response ? error.response.data : error.message
      );
    }
    }
  };

  return (
    <>
      <Nav />
      <form onSubmit={handleSubmit} className="login-main">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input type="submit" value="Login" />
        <Link className="signup-btn" to="/register">Signup</Link>
      </form>
    </>
  );
}

export default LoginForm;
