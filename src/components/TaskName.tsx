"use client";

import { TTask } from "@/utils/types/task";
import { useState, type FC } from "react";
import { Input } from "./ui/input";
import { updateTaskName } from "@/app/actions/task";
import { toast } from "@/hooks/use-toast";
import { showErrorToast } from "@/lib/utils";
import { Button } from "./ui/button";
import { Edit } from "lucide-react";

interface Props {
  task: TTask;
  isUpdating: boolean;
  setIsUpdating: (value: boolean) => void;
}

const TaskName: FC<Props> = ({ task, isUpdating, setIsUpdating }) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(task.name);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await updateTaskName(task.id, name);
    if (error) {
      showErrorToast("Error updating task name.");
      return;
    }

    toast({
      title: "Updated",
      description: "Task updated successfully",
    });

    setLoading(false);
    setIsUpdating(false);
  };

  return isUpdating ? (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Input
        type="text"
        defaultValue={task.name}
        onChange={(e) => setName(e.target.value)}
        disabled={loading}
      />
      <Button
        size="icon"
        disabled={loading}
        className="transition-all duration-300"
      >
        <Edit className="size-4" />
      </Button>
    </form>
  ) : (
    <h3 className="text-lg font-semibold text-gray-800 truncate">
      {task.name}
    </h3>
  );
};

export default TaskName;
