import { TTask } from "@/utils/types/task";
import TaskCard from "./TaskCard";
import { FC } from "react";

interface Props {
  tasks: TTask[];
}
const TasksList: FC<Props> = async ({ tasks }) => {
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
