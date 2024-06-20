import Todo from "../models/todo.js"
import user from "../models/user.js";
export const  addTask = async (req,res)=>{
    let {id} = req.params;
    let User = await user.findById(id)
    let {text} = req.body
    await Todo.create({
        text,
        completed : false,
        userId : User._id,
    })

    return res.status(201)
}
export const  getTasks = async (req,res)=>{
    let Tasks = await Todo.find({userId : req.params.id})
        res.status(201).json({
        tasks : Tasks,
    })
}
export const deleteTask = async (req, res)=>{
    try {
        const id = req.params.id; // Corrected variable declaration
        const deletedTask = await Todo.findByIdAndDelete(id); // Assuming Todo is your mongoose model
    
        if (!deletedTask) {
          return res.status(404).json({ message: "Task not found" });
        }
    
        console.log("Task deleted:", deletedTask);
        return res.status(200).json({ message: "Task deleted successfully" });
      } catch (error) {
        console.error("Error deleting task:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
    };



