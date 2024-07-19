import React, { useEffect, useState } from "react";

import Button from "../common/Button";
import DateTimeInput from "../common/DateTimeInput";
import Input from "../common/Input";
import { Task } from "../../interfaces/redux-interfaces";
import { updateTask } from "../../redux/tasks/tasksSlice";
import { useAppDispatch } from "../../redux/hooks";

interface EditTaskFormProps {
  task: Task;
  onClose: () => void;
}

const EditTaskForm: React.FC<EditTaskFormProps> = ({ task, onClose }) => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dateTime, setDateTime] = useState({
    date: task.date,
    time: task.time,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
    setDateTime({ date: task.date, time: task.time });
  }, [task]);

  const handleUpdateTask = () => {
    if (
      !title.trim() ||
      !description.trim() ||
      !dateTime.date ||
      !dateTime.time
    ) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    dispatch(
      updateTask({
        ...task,
        title,
        description,
        date: dateTime.date,
        time: dateTime.time,
      })
    );
    onClose();
    setError(null);
  };

  return (
    <div
      className="p-4 border border-gray-300 rounded-md"
      style={{ backgroundColor: "#5D696F" }}
    >
      <h2 className="text-lg font-bold text-white mb-4">Editar Tarefa</h2>
      <div className="mb-4">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value.toUpperCase())}
          placeholder="Título"
          className="py-2 px-3 border border-gray-400 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
      </div>
      <div className="mb-4">
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrição"
          className="py-2 px-3 border border-gray-400 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
      </div>
      <div className="mb-4">
        <DateTimeInput
          value={dateTime}
          onChange={setDateTime}
          className="w-full"
        />
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="flex gap-4">
        <Button onClick={handleUpdateTask} color="gray" className="flex-1 py-2">
          Editar
        </Button>
        <Button onClick={onClose} color="red" className="flex-1 py-2">
          Voltar
        </Button>
      </div>
    </div>
  );
};

export default EditTaskForm;
