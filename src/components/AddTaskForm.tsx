"use client";

import { createTask } from "@/app/actions/task";
import { useToast } from "@/hooks/use-toast";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import TimeTracker from "./TimeTracker";

const CreateTaskForm = () => {
  const { toast } = useToast();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const { error } = await createTask(formData);

    if (error) {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Error creating task.",
      });

      return;
    }

    toast({
      title: "Success",
      description: "Task created successfully",
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
      <Card className="col-span-full md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle>Add New Task</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex" onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Enter task name"
              onChange={() => console.log()}
              className="flex-grow mr-2"
            />
            <Button onClick={() => console.log()}>
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
          </form>
        </CardContent>
      </Card>
      <TimeTracker />
    </div>
  );
};

export default CreateTaskForm;
