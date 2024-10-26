"use client";

import { TTask } from "@/utils/types/task";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { MoreVertical, Play, TimerOff } from "lucide-react";
import { cn, formatTime, showErrorToast } from "@/lib/utils";
import { FC, useEffect, useState } from "react";
import {
  deleteTask,
  updateTaskStatus,
  updateTaskTotaltime,
} from "@/app/actions/task";
import { toast } from "@/hooks/use-toast";

interface Props {
  task: TTask;
}

const TaskCard: FC<Props> = ({ task }) => {
  const [loading, setLoading] = useState(false);
  const [totalTime, setTotalTime] = useState(task.totaltime);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setTotalTime((prev) => prev + 1);
        window.localStorage.setItem("totalTime", totalTime.toString());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isActive, totalTime]);

  const handleDeleteTask = async () => {
    setLoading(true);

    const { error } = await deleteTask(task.id);

    if (error) {
      showErrorToast("Error deleting task.");
      return;
    }

    toast({
      title: "Success",
      description: "Task deleted successfully",
    });

    setLoading(false);
  };

  const toggleStatusTask = async () => {
    setLoading(true);
    const newStatus = !isActive;
    setIsActive(newStatus);

    const { error: statusError } = await updateTaskStatus(task.id, newStatus);
    if (statusError) {
      showErrorToast("Error changing task status.");
      setLoading(false);
      return;
    }

    if (!newStatus) {
      const { error: timeError } = await updateTaskTotaltime(
        task.id,
        totalTime
      );
      if (timeError) {
        showErrorToast("Error updating task total time.");
      }
    }

    setLoading(false);
  };

  return (
    <Card
      className={cn(
        "transition-all duration-300 hover:shadow-lg",
        loading && "opacity-50 cursor-not-allowed"
      )}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {task.name}
          </h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" disabled={loading}>
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => console.log("")}>
                Reset
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDeleteTask()}>
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log("")}>
                Update
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-gray-900">
            {formatTime(totalTime)}
          </span>
          <div className="flex gap-2 items-center">
            <Button
              onClick={() => toggleStatusTask()}
              variant={isActive ? "destructive" : "default"}
              size="icon"
              disabled={loading}
              className="transition-all duration-300"
            >
              {isActive ? (
                <TimerOff className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
