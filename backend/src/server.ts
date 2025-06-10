import express from 'express';
import cors from 'cors';
import { initDb } from './db';
import taskRoutes from './routes/tasks';

const startServer = async () => {
  const db = await initDb();
  const app = express();
  const PORT = 3001;

  app.use(cors());
  app.use(express.json());

  app.use('/tasks', taskRoutes(db));

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();