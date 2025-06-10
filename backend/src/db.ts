import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const initDb = async () => {
  const db = await open({
    filename: ':memory:',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      dueDate TEXT,
      status TEXT DEFAULT 'Pending'
    )
  `);

  return db;
};