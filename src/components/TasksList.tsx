import { getTasks } from "@/app/actions/task";
import TaskCard from "./TaskCard";

const TasksList = async () => {
  const { tasks } = await getTasks();

  return (
    <>
      {tasks ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <p>No tasks found.</p>
      )}
    </>
  );
};

export default TasksList;
