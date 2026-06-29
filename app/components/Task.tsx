"use client";

import { ITask } from "@/types/tasks";
import React, { useState } from "react"; 
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";

interface TaskProps {
  task: ITask;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

const Task: React.FC<TaskProps> = ({ task, onToggle, onDelete, onEdit }) => {
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text || "");

  const handleSubmitEditTodo = (e: React.FormEvent) => {
    e.preventDefault();
    onEdit(task.id, taskToEdit);
    setOpenModalEdit(false);
  };

  return (
    <tr className="border-b border-gray-800/40">
      <td className={`w-full ${task.completed ? "line-through text-gray-500" : "text-gray-200"}`}>
        {task.text}
      </td>
      <td className="flex gap-5 items-center py-4">
        
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="checkbox checkbox-primary cursor-pointer"
        />

        <FiEdit3 onClick={() => setOpenModalEdit(true)} className="text-blue-500 cursor-pointer" size={20} />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className="font-bold text-lg text-white mb-2">Edit task name</h3>
            <input
              type="text"
              className="input input-bordered w-full bg-gray-900 border-gray-700 text-white mb-4"
              onChange={(e) => setTaskToEdit(e.target.value)}
              value={taskToEdit}
            />
            <button type="submit" className="btn btn-primary w-full">Save Changes</button>
          </form>
        </Modal>

        <FiTrash2 onClick={() => setOpenModalDelete(true)} className="text-pink-500 cursor-pointer" size={20} />
        <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
          <h3 className="text-lg text-white mb-4">Confirm delete action?</h3>
          <div className="flex gap-2">
            <button type="button" onClick={() => onDelete(task.id)} className="btn btn-error flex-1">Yes, Delete</button>
            <button type="button" onClick={() => setOpenModalDelete(false)} className="btn flex-1">Cancel</button>
          </div>
        </Modal>
        
      </td>
    </tr>
  );
};

export default Task;
