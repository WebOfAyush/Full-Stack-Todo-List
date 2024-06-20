import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css'
import Todo from "./components/Todo";
import LandingPage from "./components/LandingPage";
import Login from './components/Login'
import Register from './components/Register'
import Home from "./components/Home"
import { useAuthContext } from "./context/authContext";

function App() {
  const { authorized } = useAuthContext();
  const router = createBrowserRouter([
    {
      path: "/",
      element: authorized ? <Home/> : <LandingPage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/todo",
      element: <Todo/>
    }
    
    
  ]);
  return <RouterProvider router={router} />;

}

export default App
