import React, { Suspense, lazy, useEffect } from "react";

import { ClipLoader } from "react-spinners";
import { RootState } from "../../redux/store";
import { fetchTasks } from "../../redux/tasks/tasksSlice";
import { useAppDispatch } from "../../redux/hooks";
import { useSelector } from "react-redux";

const TaskItem = lazy(() => import("./TaskItem"));

const TaskList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { tasks, loading, error } = useSelector(
    (state: RootState) => state.tasks
  );

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

  const incompleteTasks = tasks.filter((task) => !task.completed);

  return (
    <Suspense fallback={<ClipLoader color="#FFFFFF" size={50} />}>
      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        {incompleteTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </Suspense>
  );
};

export default TaskList;
