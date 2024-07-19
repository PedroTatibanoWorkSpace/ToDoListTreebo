import { Task } from '../interfaces/redux-interfaces';
import axios from 'axios';
import { baseURL } from './apiConfig';

export const getTasks = async (): Promise<Task[]> => {
  const response = await axios.get(`${baseURL}/tasks`);
  return response.data;
};

export const getTask = async (id: string): Promise<Task> => {
  const response = await axios.get(`${baseURL}/tasks/${id}`);
  return response.data;
};

export const addTask = async (task: Partial<Task>): Promise<Task> => {
  const response = await axios.post(`${baseURL}/tasks`, task);
  return response.data;
};

export const updateTask = async (id: string, task: Partial<Task>): Promise<Task> => {
  const response = await axios.patch(`${baseURL}/tasks/${id}`, task);
  return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await axios.delete(`${baseURL}/tasks/${id}`);
};

export const toggleTaskComplete = async (id: string): Promise<Task> => {
  const response = await axios.patch(`${baseURL}/tasks/${id}/toggle`);
  return response.data;
};
