import React, { useEffect, useState } from "react";
import axios from "axios";
import TodoInput from "./TodoInput";
import { FaTrash } from "react-icons/fa";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { useUserIdContext } from "../context/UserContext";

function Todo() {
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
  }, []);

  const allTodos = todos.map((task) => (
    <li className="Todo" key={task._id}>
      {task.text}
      <FaTrash className="delete-icon" onClick={() => deleteTask(task._id)} />
    </li>
  ));

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done!</h1>
      <TodoInput getTasks={getTasks}/>
      <ul className="todo-list">{allTodos}</ul>
    </div>
  );
}

export default Todo;
