import { ITask } from "./types/tasks";
const baseUrl = "http://localhost:3001";

export const getAllTodos = async (): Promise<ITask[]> => {
  const resp = await fetch(`${baseUrl}/tasks`, { cache: "no-store" });
  const todos = await resp.json();
  return todos;
};

export const addTodo = async (todo: ITask): Promise<ITask> => {
  const resp = await fetch(`${baseUrl}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  const newTodo = await resp.json();
  return newTodo;
};

export const editTodo = async (todo: ITask): Promise<ITask> => {
  const resp = await fetch(`${baseUrl}/tasks/${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  const updatedTodo = await resp.json();
  return updatedTodo;
};

export const deleteTodo = async (id: string): Promise<void> => {
  await fetch(`${baseUrl}/tasks/${id}`, {
    method: "DELETE",
  });
};
