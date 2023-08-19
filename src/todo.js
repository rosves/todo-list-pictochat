import React, { useState, useEffect } from "react";
import '../src/todo.css'

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [keyPressed, setKeyPressed] = useState("");
  
  


  const handleInputChange = (event) => {
    setNewTask(event.target.value);
    setKeyPressed(event.key);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      if (editTaskId !== null) {
        // Si on est en mode édition, met à jour la tâche existante
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === editTaskId ? { ...task, name: newTask } : task
          )
        );
        setEditTaskId(null);
      } else {
        // Ajoute une nouvelle tâche à la liste
        const newTaskObj = {
          id: new Date().getTime(),
          name: newTask,
        };
        setTasks((prevTasks) => [...prevTasks, newTaskObj]);
      }

      setNewTask("");
      setKeyPressed("");
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        handleAddTask();
      }
    };
  
    document.addEventListener("keydown", handleKeyPress);
  
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleEditTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setNewTask(taskToEdit.name);
    setEditTaskId(taskId);
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <div id="container">

   
    <div id="barre">
      <input
        type="text"
        value={newTask}
        onChange={handleInputChange}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleAddTask();
          }
        }}
        placeholder="Nouvelle tâche"
      />
      <button onClick={handleAddTask}>
        {editTaskId !== null ? "Modifier" : "Ajouter"}
      </button>
 </div>

 <section id="window">
  <div id="screen">
    <h1>To-do List</h1>

    <div className="grid-item"></div>
    <div className="grid-item"></div>
    <div className="grid-item"></div>
    <div className="grid-item"></div>
    <div className="grid-item "></div>
    <div className="grid-item "></div>
    <div className="grid-item "></div>
    <div className="grid-item "></div>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.name}
            <div id='modifications'>
            <button onClick={() => handleEditTask(task.id)}>!</button>
            <button onClick={() => handleDeleteTask(task.id)}>X</button>
            </div>
          </li>
        ))}
      </ul>

</div>
</section> 
<section id="choice">
          <div></div>
          <div></div>
          <div></div>
          
</section>
    </div>
  );
};

export default TodoList;