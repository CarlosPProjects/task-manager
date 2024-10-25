"use server";

import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createTask = async (formData: FormData) => {
  const user = await currentUser();
  if (!user) throw new Error("User not authenticated");

  const name = formData.get("task") as string || null;
  if(!name) throw new Error("Task name is required");

  try {
    const task = await prisma.tasks.create({
      data: {
        name,
        user_id: user?.id,
      },
    });

    return { success: true, task };
  } catch (error) {
    console.log("Error creating task:", error);
    return { success: false, error: " Error creating task." };
  }
};

export const getTasks = async () => {
  const user = await currentUser();

  if (!user) throw new Error("Usuario no autenticado");

  try {
    const task = await prisma.tasks.findMany({
      where: {
        user_id: user.id,
      }
    })

    return { success: true, task };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Error getting task." };
  }
};
