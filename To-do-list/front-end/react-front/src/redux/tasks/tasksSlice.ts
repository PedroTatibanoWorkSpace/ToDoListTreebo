import * as api from '../../api/tasksAPI';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Task, TasksState } from '../../interfaces/redux-interfaces';

import { AppThunk } from '../store';

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    fetchTasksRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchTasksSuccess(state, action: PayloadAction<Task[]>) {
      state.loading = false;
      state.tasks = action.payload;
      state.error = null;
    },
    fetchTasksFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addTaskSuccess(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
      state.error = null;
    },
    updateTaskSuccess(state, action: PayloadAction<Task>) {
      const updatedTask = action.payload;
      state.tasks = state.tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );
      state.error = null;
    },
    deleteTaskSuccess(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      state.error = null;
    },
    toggleTaskCompleteSuccess(state, action: PayloadAction<Task>) {
      const toggledTask = action.payload;
      state.tasks = state.tasks.map((task) =>
        task.id === toggledTask.id ? toggledTask : task
      );
      state.error = null;
    },
  },
});

export const {
  fetchTasksRequest,
  fetchTasksSuccess,
  fetchTasksFailure,
  addTaskSuccess,
  updateTaskSuccess,
  deleteTaskSuccess,
  toggleTaskCompleteSuccess,
} = tasksSlice.actions;

export default tasksSlice.reducer;

export const fetchTasks = (): AppThunk => async (dispatch) => {
  dispatch(fetchTasksRequest());
  try {
    const tasks = await api.getTasks();
    dispatch(fetchTasksSuccess(tasks));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    dispatch(fetchTasksFailure(errorMessage));
  }
};

export const addTask = (task: Partial<Task>): AppThunk => async (dispatch) => {
  try {
    const newTask = await api.addTask(task);
    dispatch(addTaskSuccess(newTask));
  } catch (error) {
    console.error('Erro ao adicionar tarefa:', error);
  }
};

export const updateTask = (task: Task): AppThunk => async (dispatch) => {
  try {
    const updatedTask = await api.updateTask(task.id, task);
    dispatch(updateTaskSuccess(updatedTask));
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
  }
};

export const deleteTask = (taskId: string): AppThunk => async (dispatch) => {
  try {
    await api.deleteTask(taskId);
    dispatch(deleteTaskSuccess(taskId));
  } catch (error) {
    console.error('Erro ao deletar tarefa:', error);
  }
};

export const toggleTaskComplete = (taskId: string): AppThunk => async (
  dispatch
) => {
  try {
    const toggledTask = await api.toggleTaskComplete(taskId);
    dispatch(toggleTaskCompleteSuccess(toggledTask));
  } catch (error) {
    console.error('Erro ao alternar status da tarefa:', error);
  }
};
