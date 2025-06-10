import { Router } from 'express';
import { Database } from 'sqlite';
import { Task } from '../types/Task';

export default function taskRoutes(db: Database): Router {
  const router = Router();

  router.get('/', async (_, res) => {
    const tasks = await db.all('SELECT * FROM tasks ORDER BY dueDate ASC');
    res.json(tasks);
  });

  router.post('/', async (req, res) => {
    const { title, description, dueDate, status }: Task = req.body;

    if (!title) return res.status(400).json({ error: 'Title is required' });

    const result = await db.run(
      `INSERT INTO tasks (title, description, dueDate, status)
       VALUES (?, ?, ?, ?)`,
      [title, description, dueDate, status || 'Pending']
    );

    const task = await db.get('SELECT * FROM tasks WHERE id = ?', result.lastID);
    res.status(201).json(task);
  });

  router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { title, description, dueDate, status }: Task = req.body;

    await db.run(
      `UPDATE tasks SET title = ?, description = ?, dueDate = ?, status = ? WHERE id = ?`,
      [title, description, dueDate, status, id]
    );

    const updated = await db.get('SELECT * FROM tasks WHERE id = ?', id);
    res.json(updated);
  });

  router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    await db.run('DELETE FROM tasks WHERE id = ?', id);
    res.status(204).send();
  });

  return router;
}