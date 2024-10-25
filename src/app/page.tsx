import TaskHeader from "@/components/TaskHeader";
import TasksList from "@/components/TasksList";

export default async function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Time Tracker</h1>
        <TaskHeader />
        <TasksList />
      </div>
    </div>
  );
}
