// // import React from 'react'
// // import { useState } from 'react'


// // const AddTask = () => {
// //     const [task, setTask] = useState("");
// //     const [tasks, setTasks] = useState([]);

// //     const addTask = () => {
// //         if (!task.trim()) return;
// //         const newTask = { id: Date.now(), text: task };
// //         setTasks(prev => [...prev, newTask]);
// //         setTask("");
// //     };

// //     const deleteTask = (id) => {
// //         setTasks(prev => prev.filter(t => t.id !== id));
// //     };

// //     const toggleComplete = (id: number) => {
// //         const updated = tasks.map(task =>
// //             task.id === id ? { ...task, completed: !task.completed } : task
// //         );
// //         setTasks(updated);
// //     };

// //     const deleteTask = (id: number) => {
// //         const updated = tasks.filter(task => task.id !== id);
// //         setTasks(updated);
// //     };




// //     return (
// //         <div>
// //             <div className="task-box">
// //                 <input value={task} onChange={e => setTask(e.target.value)} placeholder="Add a new task" type='text' className='task' />
// //                 <button onClick={addTask} className='btn1'> + Add Task </button>
// //             </div>

// //             <div className='task-box'>
// //                 <p className='task-boxes'>
// //                     {tasks.map(t => (
// //                         <li key={t.id} className='task-list' >
// //                             {t.text}  <button onClick={() => deleteTask(t.id)} className='btn2'>Delete</button>

// //                         </li>
// //                     ))}
// //                 </p>
// //             </div>

// //         </div>


// //     )
// // }
// // export default AddTask



// "use client";

// import { useState } from "react";

// export default function AddTask() {
//   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState("");

//   const totalTasks = tasks.length;
//   const completedTasks = tasks.filter(t => t.completed).length;
//   const pendingTasks = tasks.filter(t => !t.completed).length;

//   const addTask = () => {
//     if (!newTask.trim()) return;

//     const task = {
//       id: Date.now(),
//       title: newTask,
//       completed: false
//     };

//     setTasks([...tasks, task]);
//     setNewTask("");
//   };

//   const toggleComplete = () => {
//     setTasks(tasks.map(t =>
//       t.id === id ? { ...t, completed: !t.completed } : t
//     ));
//   };

//   const deleteTask = () => {
//     setTasks(tasks.filter(t => t.id !== id));
//   };


//   return (
//     <div>


//       <div className="box">
//         <p>Total Tasks: {totalTasks}</p>
//         <p>Completed: {completedTasks}</p>
//         <p>Pending: {pendingTasks}</p>
//       </div>

//       <div className="task-box">
//         <input 
//           value={newTask}
//           onChange={(e) => setNewTask(e.target.value)}
//           placeholder="Add new task" type="text" className="task"
//         />
//         <button onClick={addTask} className='btn1'>Add Task</button>
//       </div>

//       <ul className='task-box'>
//         {tasks.map(task => (
//           <li key={task.id} className='task-list'>
//             <span 
//               onClick={() => toggleComplete(task.id)}
//               style={{ 
//                 textDecoration: task.completed ? "line-through" : "none"
//               }}
//             >
//               {task.title}
//             </span>

//             <button onClick={() => deleteTask(task.id)} className='btn2'>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";

export default function AddTask() {
  // Load from localStorage on first render
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [newTask, setNewTask] = useState("");

  // Count values
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = tasks.filter(t => !t.completed).length;

  // Save to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add task
  const addTask = () => {
    if (!newTask.trim()) return;

    const task = {
      id: Date.now(),
      title: newTask,
      completed: false,
    };

    setTasks(prev => [...prev, task]);
    setNewTask("");
  };

  // Add task using Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") addTask();
  };

  // Toggle complete
  const toggleComplete = (id) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div>

      {/* Numbers */}
      <div className="numberBox">
        <p className="p1">Total Tasks: {totalTasks}</p>
        <p className="p2">Completed: {completedTasks}</p>
        <p className="p3">Pending: {pendingTasks}</p>
      </div>

      {/* Add task */}
      <div className="task-box">
        <input
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add new task"
          className="task"
        />
        <button onClick={addTask} className="btn1">Add Task</button>
      </div>

      {/* List of tasks */}
      <ul className="task-list-wrapper">
        {tasks.map(task => (
          <li key={task.id} className="task-list">

            {/* Toggle checkbox */}
            <span
              onClick={() => toggleComplete(task.id)}
              style={{
                textDecoration: task.completed ? "none" : "none",
                cursor: "pointer",
                color: task.completed ? "#777" : "#000",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
              />

              {task.title}
            </span>

            {/* Delete */}
            <button className="btn2" onClick={() => deleteTask(task.id)}>
              Delete
            </button>

          </li>
        ))}
      </ul>

    </div>
  );
}
