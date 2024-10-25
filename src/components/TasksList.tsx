import { getTasks } from "@/app/actions/task";
import TaskCard from "./TaskCard";

const TasksList = async () => {
  const { tasks } = await getTasks();

  return (
    <>
      {tasks && tasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No tasks found.</p>
      )}
    </>
  );
};

export default TasksList;
