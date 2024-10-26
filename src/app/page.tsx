import AddTaskForm from "@/components/AddTaskForm";
import TasksList from "@/components/TasksList";
import TimeTracker from "@/components/TimeTracker";
import { getTasks } from "./actions/task";

export default async function Home() {
  const { tasks } = await getTasks();

  if (!tasks) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Time Tracker</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          <AddTaskForm />
          <TimeTracker tasks={tasks} />
        </div>
        <TasksList tasks={tasks} />
      </div>
    </div>
  );
}
