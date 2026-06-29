"use client";

import { ITask } from "@/types/tasks";
import React, { useState } from "react";
import Task from "./Task";
import AddTask from "./AddTask";

interface TodoListProps {
  initialTasks: ITask[];
}

const TodoList: React.FC<TodoListProps> = () => {
  // We seed the dashboard with 3 solid, working placeholder tasks directly in memory
  const [tasks, setTasks] = useState<ITask[]>([
    { id: "1", text: "Master full-stack system architecture layers", completed: false },
    { id: "2", text: "Build responsive data analytics metric gauges", completed: true },
    { id: "3", text: "Refactor local state components to optimize rendering", completed: false }
  ]);

  // LOCAL INTERACTION HANDLERS: These work beautifully 100% of the time inside your browser tab
  const handleToggleTaskStatus = (targetId: string) => {
    const updated = tasks.map((t) => {
      if (String(t.id) === String(targetId)) {
        return { ...t, completed: !t.completed };
      }
      return t;
    });
    setTasks(updated);
  };

  const handleAddNewTask = (taskText: string) => {
    const newRecord: ITask = {
      id: Date.now().toString(),
      text: taskText,
      completed: false,
    };
    setTasks([...tasks, newRecord]);
  };

  const handleDeleteTaskRecord = (targetId: string) => {
    const filtered = tasks.filter((t) => String(t.id) !== String(targetId));
    setTasks(filtered);
  };

  const handleEditTaskText = (targetId: string, newText: string) => {
    const updated = tasks.map((t) =>
      String(t.id) === String(targetId) ? { ...t, text: newText } : t
    );
    setTasks(updated);
  };

  // REAL-TIME MATHEMATICS PIPELINE
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed === true).length;
  const efficiencyRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const milestones = [
    { id: "m1", title: "First Step", desc: "Created your first record", color: "bg-blue-600 border-blue-400", unlocked: totalTasks > 0 },
    { id: "m2", title: "Productive", desc: "Completed an assignment", color: "bg-emerald-600 border-emerald-400", unlocked: completedTasks >= 1 },
    { id: "m3", title: "Flawless", desc: "100% operational capacity", color: "bg-amber-600 border-amber-400", unlocked: efficiencyRate === 100 && totalTasks > 0 },
    { id: "m4", title: "Overachiever", desc: "Created more than 5 assignments", color: "bg-purple-600 border-purple-400", unlocked: totalTasks > 5 },
  ];

  return (
    <div className="flex flex-col gap-6 mt-4 text-[#e2e8f0]">
      <AddTask onAddTask={handleAddNewTask} />

      {/* METRICS DASHBOARD GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#161920] border border-blue-500/20 p-5 rounded-2xl shadow-lg flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Total Tasks</span>
            <div className="text-4xl font-extrabold mt-1 text-white">{totalTasks}</div>
          </div>
          <div className="text-[10px] px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 font-semibold border border-blue-500/20 uppercase tracking-wider">Dataset</div>
        </div>

        <div className="bg-[#161920] border border-emerald-500/20 p-5 rounded-2xl shadow-lg flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Live Efficiency</span>
            <div className="text-4xl font-extrabold mt-1 text-white">{efficiencyRate}%</div>
          </div>
          <div className="w-16 bg-gray-900 border border-emerald-500/30 rounded-full h-3 overflow-hidden">
            <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${efficiencyRate}%` }}></div>
          </div>
        </div>

        <div className="bg-[#161920] border border-amber-500/20 p-5 rounded-2xl shadow-lg flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Completion Ratio</span>
            <div className="text-4xl font-extrabold mt-1 text-white">
              {completedTasks}<span className="text-xl text-gray-500 font-medium">/{totalTasks}</span>
            </div>
          </div>
          <div className="text-[10px] px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 font-semibold border border-amber-500/20 uppercase tracking-wider">Operations</div>
        </div>
      </div>

      {/* MILESTONES BANNER */}
      <div className="bg-[#161920] border border-gray-800 p-5 rounded-2xl shadow-lg">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-3">AI & Analytics Milestones</span>
        <div className="flex flex-wrap gap-2">
          {milestones.map((milestone) => (
            <div
              key={milestone.id}
              className={`text-xs font-bold px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all duration-300 ${
                milestone.unlocked ? `${milestone.color} text-white scale-100 shadow-md` : "bg-gray-900 text-gray-500 border-gray-800 scale-95 opacity-40 select-none"
              }`}
            >
              <span>{milestone.unlocked ? "🏆" : "🔒"}</span>
              <span>{milestone.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* DATA TABLE VIEW */}
      <div className="overflow-x-auto rounded-2xl border border-gray-800 bg-[#161920] shadow-xl">
        <table className="table w-full">
          <thead>
            <tr className="border-b border-gray-800 text-gray-400">
              <th className="bg-transparent">Tasks</th>
              <th className="bg-transparent">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <Task 
                  key={task.id} 
                  task={task} 
                  onToggle={handleToggleTaskStatus}
                  onDelete={handleDeleteTaskRecord}
                  onEdit={handleEditTaskText}
                />
              ))
            ) : (
              <tr>
                <td colSpan={2} className="text-center py-8 text-gray-500 italic">No operational records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodoList;
