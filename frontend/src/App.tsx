import React, { useEffect, useState } from 'react';
import { Task } from './types';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:3001/tasks');
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="app-container">
      <h1>Task Management</h1>
      <TaskForm onTaskAdded={fetchTasks} />
      <TaskList tasks={tasks} onTaskUpdated={fetchTasks} />
    </div>
  );
};

export default App;