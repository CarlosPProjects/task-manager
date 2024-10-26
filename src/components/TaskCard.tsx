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
import { cn, formatTime } from "@/lib/utils";
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

  const handleDeleteTask = async (id: number) => {
    setLoading(true);

    const { error } = await deleteTask(id);

    if (error) {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Error deleting task.",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Task deleted successfully",
    });

    setLoading(false);
  };

  const toggleStatusTask = async (id: number) => {
    const newStatus = !isActive;

    setIsActive(newStatus);

    if (newStatus) {
      await playTask(id);
    } else {
      await stopTask(id);
    }
  };

  const playTask = async (id: number) => {
    setLoading(true);

    const { error } = await updateTaskStatus(id, true);

    if (error) {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Error changing task status.",
      });
      console.log(error);
    }

    setLoading(false);
  };

  const stopTask = async (id: number) => {
    setLoading(true);

    const { error } = await updateTaskTotaltime(id, totalTime);

    if (error) {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Error changing task status.",
      });
      console.log(error);
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
              <DropdownMenuItem onClick={() => handleDeleteTask(task.id)}>
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
            {!isActive && (
              <Button
                onClick={() => toggleStatusTask(task.id)}
                variant={"default"}
                size="icon"
                disabled={loading}
                className="transition-all duration-300"
              >
                <Play className="w-4 h-4" />
              </Button>
            )}
            <Button
              onClick={() => toggleStatusTask(task.id)}
              variant={isActive ? "destructive" : "default"}
              size="icon"
              disabled={loading || totalTime === 0 || !isActive}
              className="transition-all duration-300"
            >
              <TimerOff className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
