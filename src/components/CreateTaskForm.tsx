"use client";

import { getCategories } from "@/app/actions/categories";
import { createTask } from "@/app/actions/task";
import React, { useEffect } from "react";

const CreateTaskForm = () => {
  const [categories, setCategories] = React.useState<ICategory[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const { category, task } = Object.fromEntries(formData);

    if (!category || !task) return;

    await createTask(task.toString(), parseInt(category as string));
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };

    fetchCategories();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-48">
      <input type="text" name="task" />
      <select name="category">
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.title}
          </option>
        ))}
      </select>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default CreateTaskForm;
