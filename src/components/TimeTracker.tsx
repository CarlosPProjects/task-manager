import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Clock } from "lucide-react";
import { formatTime } from "@/lib/utils";

const TimeTracker = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Time</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center">
          <Clock className="w-6 h-6 mr-2" />
          <span className="text-3xl font-bold text-gray-900">
            {formatTime(0)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeTracker;
