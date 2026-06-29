import TodoList from "./components/TodoList";

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto p-4">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-extrabold text-[#e2e8f0]">My Operational Todo Tracker</h1>
      </div>
      {/* We return to passing a clean, local placeholder list */}
      <TodoList initialTasks={[]} />
    </main>
  );
}
