import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { getTasks } from "./actions/task";
import CreateTaskForm from "@/components/CreateTaskForm";

export default async function Home() {
  const { error, task } = await getTasks();

  

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
        {!error && task?.map((task) => <div key={task.id}>{task.name}</div>)}
      </div>
      <CreateTaskForm />
    </div>
  );
}
