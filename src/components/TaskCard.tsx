"use client";

import { TTask } from "@/utils/types/task";
import { Card, CardContent } from "@/components/ui/card";
import { type FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { MoreVertical, Pause, Play } from "lucide-react";
import { formatTime } from "@/lib/utils";

interface Props {
  task: TTask;
}

const TaskCard: FC<Props> = ({ task }) => {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {task.name}
          </h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => console.log("")}>
                Reset
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log("")}>
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
            {formatTime(task.totaltime)}
          </span>
          <Button
            onClick={() => console.log()}
            variant={task.isactive ? "destructive" : "default"}
            size="icon"
            className="transition-all duration-300"
          >
            {task.isactive ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
