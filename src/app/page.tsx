"use client";
import { useEffect, useState } from "react";
import { useSession, useUser } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";
import { createTask } from "./actions/task";

export default function Home() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  // The `useUser()` hook will be used to ensure that Clerk has loaded data about the logged in user
  const { user } = useUser();
  // The `useSession()` hook will be used to get the Clerk session object
  const { session } = useSession();

  // Create a custom supabase client that injects the Clerk Supabase token into the request headers
  function createClerkSupabaseClient() {
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_KEY!,
      {
        global: {
          // Get the custom Supabase token from Clerk
          fetch: async (url, options = {}) => {
            const clerkToken = await session?.getToken({
              template: "supabase",
            });

            // Insert the Clerk Supabase token into the headers
            const headers = new Headers(options?.headers);
            headers.set("Authorization", `Bearer ${clerkToken}`);

            // Now call the default fetch
            return fetch(url, {
              ...options,
              headers,
            });
          },
        },
      }
    );
  }

  // Create a `client` object for accessing Supabase data using the Clerk token
  const client = createClerkSupabaseClient();

  // This `useEffect` will wait for the User object to be loaded before requesting
  // the tasks for the signed in user
  useEffect(() => {
    if (!user) return;

    async function loadTasks() {
      setLoading(true);
      const { data, error } = await client.from("tasks").select();
      const res = await client.from("categories").select();
      if (!error) setTasks(data);
      if (!res.error) setCategories(res.data);
      setLoading(false);
    }

    loadTasks();
  }, [user]);

  // Add a task into the "tasks" database
  async function createT(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // await client.from("tasks").insert({
    //   name,
    // });

    await createTask(name);
    window.location.reload();
  }

  // Update a task when its completed
  async function onCheckClicked(taskId: number, isDone: boolean) {
    await client
      .from("tasks")
      .update({
        is_done: isDone,
      })
      .eq("id", taskId);
    window.location.reload();
  }

  // Delete a task from the database
  async function deleteTask(taskId: number) {
    await client.from("tasks").delete().eq("id", taskId);
    window.location.reload();
  }

  return (
    <div>
      {!loading && tasks.length > 0 && (
        <div>
          <h2>Categories</h2>
          
            <select>
              {categories.map((category: any) => (
                <option key={category.id} value={category.id}>{category.title}</option>
              ))}
            </select>
          
        </div>
      )}
      <h1>Tasks</h1>

      {loading && <p>Loading...</p>}

      {!loading &&
        tasks.length > 0 &&
        tasks.map((task: any) => (
          <div
            key={task.id}
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <input
              type="checkbox"
              checked={task.is_done}
              onChange={(e) => onCheckClicked(task.id, e.target.checked)}
            />
            <p>{task.name}</p>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
        ))}

      {!loading && tasks.length === 0 && <p>No tasks found</p>}

      <form onSubmit={createT}>
        <input
          autoFocus
          type="text"
          name="name"
          placeholder="Enter new task"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
