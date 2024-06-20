// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import Nav from "./nav";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import { useUserIdContext } from "../context/UserContext";

function Register() {
  const { setAuthorized } = useAuthContext();
  const {setUserId} = useUserIdContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log("Submitting form with:", { username, email, password });
      const response = await axios.post(
        `${import.meta.env.VITE_ENDPOINT}api/register`,
        {
          username,
          email,
          password,
        },
        {
          credentials: true,
        }
      );
     
      if (response.status === 201) {
        setUserId(response.data.User._id)
        localStorage.setItem('UserId', response.data.User._id)
        localStorage.setItem('isAuthenticated', true)
        setAuthorized(true);
        Toastify({
          text: "SignUp Successfull",
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
        navigate("/");
       
      } 
    } catch (error) {
      if (error.response && error.response.status === 409) {
        Toastify({
          text: "User Already Exist",
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "top", // `top` or `bottom`
          position: "center", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
          onClick: function(){}
        }).showToast();
      }
      console.error(
        "SignUp failed:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <>
      <Nav />
      <form onSubmit={handleSubmit} className="signup-main">
        <input
          type="username"
          name="username"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
        <input type="submit" value="Sign up" />
      </form>
    </>
  );
}

export default Register;
