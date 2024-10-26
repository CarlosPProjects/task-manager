"use client";

import { FC, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Clock } from "lucide-react";
import { formatTime } from "@/lib/utils";
import { TTask } from "@/utils/types/task";

interface Props {
  tasks: TTask[];
}

const TimeTracker: FC<Props> = ({ tasks }) => {
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    setTotalTime(tasks.reduce((sum, task) => sum + task.totaltime, 0));
  }, [tasks]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Time</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center">
          <Clock className="w-6 h-6 mr-2" />
          <span className="text-3xl font-bold text-gray-900">
            {formatTime(totalTime)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeTracker;
