import React, { useState } from "react";

import Button from "../common/Button";
import DateTimeInput from "../common/DateTimeInput";
import Input from "../common/Input";
import { addTask } from "../../redux/tasks/tasksSlice";
import { useAppDispatch } from "../../redux/hooks";

const AddTaskForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateTime, setDateTime] = useState({ date: "", time: "" });
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleAddTask = () => {
    if (!title || !description || !dateTime.date || !dateTime.time) {
      setErrorMessage("Existe campos faltando.");
      return;
    }

    dispatch(
      addTask({
        title,
        description,
        date: dateTime.date,
        time: dateTime.time,
        completed: false,
      })
    );

    setTitle("");
    setDescription("");
    setDateTime({ date: "", time: "" });
    setErrorMessage("");
  };

  return (
    <div
      className="p-4 border border-gray-300 rounded-md max-w-md mx-auto"
      style={{
        background: "#455A64",
        border: "1px solid #455A64",
        marginBottom: "3%",
      }}
    >
      <h2 className="text-2xl font-semibold mb-4 text-white">
        Adicionar Tarefa
      </h2>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value.toUpperCase())}
        placeholder="Título"
        className="mb-2"
      />
      <Input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descrição"
        className="mb-2"
      />
      <DateTimeInput
        value={dateTime}
        onChange={(value) => setDateTime(value)}
      />
      {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
      <Button onClick={handleAddTask} color="green">
        Adicionar Tarefa
      </Button>
    </div>
  );
};

export default AddTaskForm;
