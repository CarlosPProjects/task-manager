import CreateTaskForm from "@/components/CreateTaskForm";
import TasksList from "@/components/TasksList";

export default async function Home() {
  return (
    <div>
      <h1>Tasks</h1>
      <TasksList />
    </div>
  );
}
