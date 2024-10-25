"use client";

import { createTask } from "@/app/actions/task";
import { useToast } from "@/hooks/use-toast";
import React from "react";

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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-48">
      <input type="text" name="task" />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default CreateTaskForm;
