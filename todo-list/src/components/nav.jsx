import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import Logout from "./Logout";
function nav() {
  const { authorized } = useAuthContext();

  return (
    <>
      <nav className="nav">
        <h1 className="nav-heading">TodoBuddy</h1>
        {authorized ? <Logout /> : <Link className="login-btn" to="/login">Login</Link>}
      </nav>
    </>
  );
}

export default nav;
