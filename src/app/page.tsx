import AddTaskForm from "@/components/AddTaskForm";
import TasksList from "@/components/TasksList";
import TimeTracker from "@/components/TimeTracker";
import { getTasks } from "./actions/task";

export default async function Home() {
  const { tasks } = await getTasks();

  if (!tasks) return <div>Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        <AddTaskForm />
        <TimeTracker tasks={tasks} />
      </div>
      <TasksList tasks={tasks} />
    </div>
  );
}
