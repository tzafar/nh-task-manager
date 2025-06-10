import React, { useState } from 'react';
import { Task } from './types';

interface Props {
  onTaskAdded: () => void;
}

const TaskForm: React.FC<Props> = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState<'Pending' | 'In Progress' | 'Completed'>('Pending');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return alert('Title is required');

    await fetch('http://localhost:3001/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, dueDate, status }),
    });

    setTitle('');
    setDescription('');
    setDueDate('');
    setStatus('Pending');
    onTaskAdded();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
      <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
      <select value={status} onChange={e => setStatus(e.target.value as Task['status'])}>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;