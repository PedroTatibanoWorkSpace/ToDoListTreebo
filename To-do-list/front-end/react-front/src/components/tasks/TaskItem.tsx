import { FaCalendarAlt, FaClock } from "react-icons/fa";
import React, { Suspense, lazy, useState } from "react";

import Button from "../common/Button";
import { ClipLoader } from "react-spinners";
import { FormatDate } from "../../utils/utils";
import { Task } from "../../interfaces/redux-interfaces";
import { toggleTaskComplete } from "../../redux/tasks/tasksSlice";
import { useAppDispatch } from "../../redux/hooks";

const EditTaskForm = lazy(() => import("./EditTaskForm"));
const DeleteTaskForm = lazy(() => import("./DeleteTaskForm"));

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
  };

  const handleToggleComplete = () => {
    dispatch(toggleTaskComplete(task.id));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
  };

  const handleCloseDelete = () => {
    setIsDeleting(false);
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
      {!isEditing && !isDeleting && (
        <div style={{ flex: 1 }}>
          <span
            className={`font-bold ${
              task.completed ? "line-through text-white" : "text-white"
            }`}
            style={{
              fontSize: "1.5rem",
              marginBottom: "8px",
              textDecoration: "underline",
              display: "block",
            }}
          >
            {task.title}
          </span>
          <span
            className="text-white"
            style={{
              fontSize: "1rem",
              marginBottom: "8px",
              wordBreak: "break-word",
              display: "block",
            }}
          >
            {task.description}
          </span>
          <div
            className="flex items-center text-white"
            style={{ fontSize: "1rem", marginBottom: "8px" }}
          >
            <FaClock className="mr-1" /> {task.time}
          </div>
          <div
            className="flex items-center text-white"
            style={{ fontSize: "1rem" }}
          >
            <FaCalendarAlt className="mr-1" /> {FormatDate(task.date)}
          </div>
        </div>
      )}
      <div
        className="flex flex-col mt-2 md:mt-0 md:ml-auto space-y-2"
        style={{ marginLeft: "auto" }}
      >
        {!isEditing && !isDeleting && (
          <>
            <Button
              onClick={handleToggleComplete}
              className={`bg-green-500 text-white ${
                task.completed ? "bg-gray-500" : ""
              }`}
              style={{
                fontSize: "1rem",
                minWidth: "100px",
                marginRight: "8px",
              }}
            >
              {task.completed ? "Desfazer" : "Concluído"}
            </Button>
            <Button
              color="gray"
              onClick={handleEdit}
              className="bg-yellow-500 text-white"
              style={{
                fontSize: "1rem",
                minWidth: "80px",
                marginRight: "8px",
              }}
            >
              Editar
            </Button>
            <Button
              onClick={handleDelete}
              color="red"
              className="bg-red-500 text-white"
              style={{ fontSize: "1rem", minWidth: "80px" }}
            >
              Excluir
            </Button>
          </>
        )}
      </div>
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-full">
            <ClipLoader color="#FFFFFF" size={50} />
          </div>
        }
      >
        {isEditing && <EditTaskForm task={task} onClose={handleCloseEdit} />}
        {isDeleting && (
          <DeleteTaskForm task={task} onClose={handleCloseDelete} />
        )}
      </Suspense>
    </div>
  );
};

export default TaskItem;
