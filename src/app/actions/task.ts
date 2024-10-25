"use server";

import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export const createTask = async (formData: FormData) => {
  const user = await currentUser();
  if (!user) throw new Error("User not authenticated");

  const name = (formData.get("task") as string) || null;
  if (!name) throw new Error("Task name is required");

  try {
    const task = await prisma.tasks.create({
      data: {
        name,
        user_id: user?.id,
      },
    });

    revalidatePath("/");

    return { success: true, task };
  } catch (error) {
    console.log("Error creating task:", error);
    return { success: false, error: " Error creating task." };
  }
};

export const getTasks = async () => {
  const user = await currentUser();

  if (!user) throw new Error("User not authenticated");

  try {
    const tasks = await prisma.tasks.findMany({
      where: {
        user_id: user.id,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    revalidatePath("/");

    return { success: true, tasks };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Error getting task." };
  }
};

export const deleteTask = async (id: number) => {
  const user = await currentUser();

  if (!user) throw new Error("User not authenticated");

  if (!id) throw new Error("Task id is required");

  try {
    await prisma.tasks.delete({
      where: {
        id,
        user_id: user.id,
      },
    });

    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Error deleting task." };
  }
};

export const updateTaskStatus = async (id: number, isActive: boolean) => {
  const user = await currentUser();

  if (!user) throw new Error("User not authenticated");

  if (!id) throw new Error("Task id is required");

  try {
    await prisma.tasks.update({
      where: {
        id,
        user_id: user.id,
      },
      data: {
        isactive: !isActive,
      },
    });

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Error updating task status." };
  }
};

export const updateTaskTotaltime = async (id: number, totalTime: number) => {
  const user = await currentUser();

  if (!user) throw new Error("User not authenticated");

  if (!id) throw new Error("Task id is required");

  try {
    await prisma.tasks.update({
      where: {
        id,
        user_id: user.id,
      },
      data: {
        totaltime: totalTime,
      },
    });

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Error updating task time." };
  }
};
