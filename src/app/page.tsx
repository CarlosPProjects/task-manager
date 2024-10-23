import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { getUserTasks } from "./actions/task";
import { getCategories } from "./actions/categories";

export default async function Home() {
  const tasks = await getUserTasks();
  const categories = await getCategories();

  

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
      <div>
        {categories?.map((category) => (
          <div key={category.id}>{category.title}</div>
        ))}
      </div>
      
      <form action="" className="flex flex-col gap-4 max-w-48">
        <input type="text" />
        <select name="" id="">
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
