import { ITask } from "./types/tasks";
const baseUrl = "http://127.0.0.1:8000";

export const getAllTodos = async (): Promise<ITask[]> => {
    // Adding a random timestamp (?t=...) ensures Next.js cannot read from an old cache!
    const resp = await fetch(`${baseUrl}/api/tasks?t=${Date.now()}`, { 
        cache: 'no-store' // Force a direct read from the live database file
    });

    if (!resp.ok) {
    throw new Error("Failed to extract data rows from Python SQL repository");
  }
    const todos = await resp.json();
    return todos;
}


export const addTodo = async (todo: ITask): Promise<ITask> => {
  const resp = await fetch(`${baseUrl}/api/tasks`, {
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
  // Convert the ID to a clean integer number
  const numericId = parseInt(todo.id, 10);

  const resp = await fetch(`${baseUrl}/api/tasks/${numericId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...todo,
      id: numericId // Send as a true integer to Python
    }),
  });

  if (!resp.ok) {
    throw new Error("Failed to execute data modification pipeline on row index");
  }

  const updatedTodo = await resp.json();
  return updatedTodo;
};


export const deleteTodo = async (id: string): Promise<void> => {
  await fetch(`${baseUrl}/api/tasks/${id}`, {
    method: "DELETE",
  });
};
