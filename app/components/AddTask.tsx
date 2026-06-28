"use client";

import { FaPlus } from "react-icons/fa";
import Modal from "./Modal";
import { useState } from "react";

interface AddTaskProps {
  onAddTask: (text: string) => void; // Connects the form text to your dashboard state array
}

const AddTask: React.FC<AddTaskProps> = ({ onAddTask }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>( "" );

  const handleSubmitNewTodo: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!newTaskValue.trim()) return; // Data validation: prevents submitting empty task boxes

    onAddTask(newTaskValue); // Injects your written text straight into the calculations loop
    setNewTaskValue("");     // Resets the text field back to empty
    setModalOpen(false);     // Closes the popup modal view automatically
  };
    
  return (
    <div>
      {/* Visual Button matching your sleek dashboard design */}
      <button onClick={() => setModalOpen(true)} className="btn btn-primary w-full shadow-lg font-bold tracking-wide">
        Add new task data point
        <FaPlus className="ml-2" size={13} />
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitNewTodo} className="p-2">
          <h3 className="font-extrabold text-xl text-white mb-4">Ingest New Data Record</h3>
          <div className="flex flex-col gap-4">
            <input 
              type="text" 
              placeholder="Type your objective contents here..." 
              className="input input-bordered w-full bg-gray-900 border-gray-700 text-white focus:border-primary" 
              onChange={(e) => setNewTaskValue(e.target.value)} 
              value={newTaskValue}
            />
            <button type="submit" className="btn btn-primary w-full font-bold">
              Submit Record to Pipeline
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;
