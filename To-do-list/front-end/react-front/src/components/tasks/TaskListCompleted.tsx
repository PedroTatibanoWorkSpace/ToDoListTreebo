import React, { useEffect } from 'react';

import { ClipLoader } from 'react-spinners';
import { RootState } from '../../redux/store';
import TaskItemCompleted from './TaskItemCompleted';
import { fetchTasks } from '../../redux/tasks/tasksSlice';
import { useAppDispatch } from '../../redux/hooks';
import { useSelector } from 'react-redux';

const TaskListCompleted: React.FC = () => {
  const dispatch = useAppDispatch();
  const { tasks, loading, error } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="#FFFFFF" size={50} />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {completedTasks.map((task) => (
        <TaskItemCompleted key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskListCompleted;