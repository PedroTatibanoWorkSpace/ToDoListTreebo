import React, { useEffect } from "react";

import { FaTimes } from "react-icons/fa";
import TaskListCompleted from "../tasks/TaskListCompleted";

interface SideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideModal: React.FC<SideModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end overflow-x-hidden overflow-y-auto bg-black bg-opacity-25">
          <div className="relative w-full max-w-md bg-gray-900 text-white shadow-lg rounded-lg flex flex-col h-full">
            <div className="p-4 bg-gray-900 rounded-t flex items-center justify-between">
              <h3 className="text-xl font-semibold">Histórico de Tarefas</h3>
              <button
                className="p-1 bg-transparent border-0 text-white opacity-50 hover:opacity-100 focus:outline-none"
                onClick={onClose}
              >
                <FaTimes className="text-2xl" />
              </button>
            </div>
            <div className="p-6 flex-1 overflow-y-auto max-h-full" style={{ backgroundColor: "#212832" }}>
              <TaskListCompleted />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SideModal;
