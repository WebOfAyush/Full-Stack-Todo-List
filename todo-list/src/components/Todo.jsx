import React, { useEffect, useState } from "react";
import axios from "axios";
import TodoInput from "./TodoInput";
import { FaTrash } from "react-icons/fa";
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import { useUserIdContext } from "../context/UserContext";

function Todo() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const { UserId } = useUserIdContext();

  const getTasks = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_ENDPOINT}api/gettask/${UserId}`,
        {
          withCredentials: true,
        }
      );
      setTodos(response.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async (event) => {
    event.preventDefault();
    if (task.trim() === "") {
      Toastify({
        text: "Can't add empty task",
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
      return; // Correctly return here without additional semicolons
    }
    try {
      await axios.post(
        `${import.meta.env.VITE_ENDPOINT}api/addtask/${UserId}`,
        { text: task }, // Ensure 'text' is the key if your backend expects it
        {
          withCredentials: true,
        }
      );
      setTask("");
      getTasks(); // Refresh the task list after adding a new task
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  

  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_ENDPOINT}api/deletetask/${id}`,
        {
          withCredentials: true,
        }
      );
      getTasks(); // Refresh the task list after deleting a task
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  useEffect(() => {
    getTasks();
  }); // Add UserId as a dependency to fetch tasks only when UserId changes

  const allTodos = todos.map((task) => (
    <li className="Todo" key={task._id}>
      {task.text}
      <FaTrash className="delete-icon" onClick={() => deleteTask(task._id)} />
    </li>
  ));

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done!</h1>
      <TodoInput addTask={addTask} task={task} setTask={setTask} />
      <ul className="todo-list">{allTodos}</ul>
    </div>
  );
}

export default Todo;