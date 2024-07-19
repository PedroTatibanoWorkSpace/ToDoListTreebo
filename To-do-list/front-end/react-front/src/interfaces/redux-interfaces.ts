export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  date: string;
  time: string;
}

export interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}
