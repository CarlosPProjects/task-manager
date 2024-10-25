"use client";

import { createTask } from "@/app/actions/task";
import React from "react";

const CreateTaskForm = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const { error } = await createTask(data.task.toString());

    if (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-48">
      <input type="text" name="task" />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default CreateTaskForm;
