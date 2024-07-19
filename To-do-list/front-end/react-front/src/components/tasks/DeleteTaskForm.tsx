import Button from "../common/Button";
import React from "react";
import { Task } from "../../interfaces/redux-interfaces";
import { deleteTask } from "../../redux/tasks/tasksSlice";
import { useAppDispatch } from "../../redux/hooks";

interface DeleteTaskFormProps {
  task: Task;
  onClose: () => void;
}

const DeleteTaskForm: React.FC<DeleteTaskFormProps> = ({ task, onClose }) => {
  const dispatch = useAppDispatch();

  const handleDeleteTask = () => {
    dispatch(deleteTask(task.id));
    onClose();
  };

  return (
    <div
      className="p-4 border border-gray-300 rounded-md"
      style={{ backgroundColor: "#5D696F" }}
    >
      <h2 className="text-lg font-bold text-white mb-4">
        Tem certeza que deseja excluir?
      </h2>
      <div className="flex gap-4">
        <Button onClick={handleDeleteTask} color="red" className="flex-1 py-2">
          Excluir
        </Button>
        <Button onClick={onClose} color="gray" className="flex-1 py-2">
          Voltar
        </Button>
      </div>
    </div>
  );
};

export default DeleteTaskForm;
