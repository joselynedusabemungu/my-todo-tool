"use client";

import { ITask } from "@/types/tasks";
import React, { useState } from "react"; 
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { editTodo } from "@/api";
import { deleteTodo } from "@/api";


interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router= useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

  const handleSubmitEditTodo : React.FormEventHandler<HTMLFormElement> = async (
      e,
    ) => {
      e.preventDefault();
      await editTodo({
       id: task.id,
       text: taskToEdit,
       completed: task.completed
      });
      setOpenModalEdit(false);
      router.refresh();
    };

    const handleDeleteTask = async (id:string) =>{
      await deleteTodo(id);
      setOpenModalDelete(false);
      router.refresh();
    } 

  return (
    <tr key={task.id}>
      <td className="w-full">{task.text}</td>
      <td className="flex gap-5">
        <input
          type="checkbox"
          checked={task.completed}
          className="checkbox"
          readOnly
        />
        <FiEdit onClick={() => setOpenModalEdit(true)} cursor="pointer" className="text-blue-500" size={23} />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className="font-bold text-lg">Edit task</h3>
            <div className="modalAction">
              <input
                type="text"
                placeholder="Type here"
                className="input w-full"
                onChange={(e) => setTaskToEdit(e.target.value)}
                value={taskToEdit}
              />
            </div>
            <div className="modalAction">
              <button type="submit" className="btn">
                Submit
              </button>
            </div>
          </form>
        </Modal>
        <FiTrash2 onClick={()=>setOpenModalDelete(true)} cursor="pointer" className="text-pink-500" size={23} />
                <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
                  <h3 className="text-lg">Are you sure you want to delete this task?</h3>
                  <div className="modal-action">
                    <button onClick={() => handleDeleteTask (task.id)} className="btn">Yes</button>
                  </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;
