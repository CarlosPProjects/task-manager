import { getTasks } from "./actions/task";
import CreateTaskForm from "@/components/CreateTaskForm";

export default async function Home() {
  const { error, task } = await getTasks();

  return (
    <div>
      <h1>Tasks</h1>
      <CreateTaskForm />
    </div>
  );
}
