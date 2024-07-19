import { FaCalendarAlt, FaClock } from "react-icons/fa";
import { deleteTask, toggleTaskComplete } from "../../redux/tasks/tasksSlice";

import Button from "../common/Button";
import { FormatDate } from "../../utils/utils";
import React from "react";
import { Task } from "../../interfaces/redux-interfaces";
import { useAppDispatch } from "../../redux/hooks";

interface TaskItemProps {
  task: Task;
}

const TaskItemCompleted: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useAppDispatch();

  const handleToggleComplete = () => {
    dispatch(toggleTaskComplete(task.id));
  };

  const handleDeleteTask = () => {
    dispatch(deleteTask(task.id));
  };

  return (
    <div
      className="p-4 border border-gray-300 rounded-md flex flex-col md:flex-row justify-between items-start md:items-center mb-2"
      style={{
        background: "#455A64",
        border: "1px solid #4D575C",
        width: "100%",
        minWidth: "300px",
        margin: "1% auto 0 auto",
        padding: "16px",
        fontFamily: "sans-serif",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <div style={{ flex: 1 }}>
        <span
          className="font-bold line-through text-white"
          style={{
            fontSize: "1.5rem",
            marginBottom: "8px",
            textDecoration: "line-through",
            display: "block",
          }}
        >
          {task.title}
        </span>
        <span
          className="text-white line-through"
          style={{
            fontSize: "1rem",
            marginBottom: "8px",
            wordBreak: "break-word",
            display: "block",
            textDecoration: "line-through",
            color: "#9CA3AF",
          }}
        >
          {task.description}
        </span>
        <div
          className="flex items-center text-white line-through"
          style={{ fontSize: "1rem", marginBottom: "8px" }}
        >
          <FaClock className="mr-1" /> {task.time}
        </div>
        <div
          className="flex items-center text-white line-through"
          style={{ fontSize: "1rem" }}
        >
          <FaCalendarAlt className="mr-1" /> {FormatDate(task.date)}
        </div>
      </div>

      <div className="flex flex-col mt-2 md:mt-0 md:ml-auto space-y-2">
        <Button
          onClick={handleToggleComplete}
          className="bg-gray-500 text-white"
          style={{
            fontSize: "1rem",
            minWidth: "100px",
            marginRight: "8px",
          }}
        >
          Desfazer
        </Button>
        <Button
          onClick={handleDeleteTask}
          className="bg-red-500 text-white"
          color="red"
        >
          Excluir
        </Button>
      </div>
    </div>
  );
};

export default TaskItemCompleted;
