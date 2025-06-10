import React from 'react';
import { Task } from './types';

interface Props {
  tasks: Task[];
  onTaskUpdated: () => void;
}

const TaskList: React.FC<Props> = ({ tasks, onTaskUpdated }) => {
  const deleteTask = async (id: number) => {
    await fetch(`http://localhost:3001/tasks/${id}`, { method: 'DELETE' });
    onTaskUpdated();
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Title</th><th>Description</th><th>Due Date</th><th>Status</th><th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map(task => (
          <tr key={task.id}>
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td>{task.dueDate}</td>
            <td>{task.status}</td>
            <td><button onClick={() => deleteTask(task.id!)}>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskList;