import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { getUserTasks } from "./actions/task";
import CreateTaskForm from "@/components/CreateTaskForm";

export default async function Home() {
  const { tasks } = await getUserTasks();

  return (
    <div>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>

      <h1>Tasks</h1>
      <div>
        {tasks?.map((task) => (
          <div key={task.id}>{task.name}</div>
        ))}
      </div>
      <h2>Categories</h2>

      <CreateTaskForm />
    </div>
  );
}
