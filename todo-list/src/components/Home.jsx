import React from "react";
import Nav from "./nav";
import { useAuthContext } from "../context/authContext";
import Todo from "./Todo";
function Home() {
  const { authorized } = useAuthContext();
  return (
    <div>
      <Nav />
      {authorized ? <Todo /> : <h5>Login/Sign Up to see todo</h5>}
    </div>
  );
}

export default Home;
