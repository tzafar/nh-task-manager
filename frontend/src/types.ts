export interface Task {
  id?: number;
  title: string;
  description?: string;
  dueDate?: string;
  status: 'Pending' | 'In Progress' | 'Completed';
}