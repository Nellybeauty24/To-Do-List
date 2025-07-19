import { useState } from 'react';

function ToDoList() {
  const [tasks, setTasks] = useState(["Eat breakfast", "Take a shower", "Go to school"]);
  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTask, setEditedTask] = useState("");

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks(t => [...t, newTask]);
      setNewTask("");
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  }

  function handleDoubleClick(index) {
    setEditingIndex(index);
    setEditedTask(tasks[index]);
  }

  function handleEditChange(event) {
    setEditedTask(event.target.value);
  }

  function handleEditSubmit(index) {
    if (editedTask.trim() !== "") {
      const updatedTasks = [...tasks];
      updatedTasks[index] = editedTask;
      setTasks(updatedTasks);
    }
    setEditingIndex(null);
    setEditedTask("");
  }

  function handleKeyPress(event, index) {
    if (event.key === "Enter") {
      handleEditSubmit(index);
    }
  }

  return (
    <div className='todo-list'>
      <h2>My To-Do-List</h2>
      <div>
        <input
          type="text"
          value={newTask}
          placeholder="Enter your task..."
          onChange={handleInputChange}
        />
        <button className='Add-Buttons' onClick={addTask}>Add</button>
      </div>

      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            {editingIndex === index ? (
              <input
                type="text"
                value={editedTask}
                onChange={handleEditChange}
                onBlur={() => handleEditSubmit(index)}
                onKeyDown={(e) => handleKeyPress(e, index)}
                autoFocus
              />
            ) : (
              <span
                className='text'
                onDoubleClick={() => handleDoubleClick(index)}
              >
                {task}
              </span>
            )}

            <button className='Delete-Button' onClick={() => deleteTask(index)}>Delete</button>
            <button className='Arrow-Button' onClick={() => moveTaskUp(index)}>⬆️</button>
            <button className='Arrow-Button' onClick={() => moveTaskDown(index)}>⬇️</button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ToDoList;

