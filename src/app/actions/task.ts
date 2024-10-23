"use server";

import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createTask = async (name: string, category_id?: number) => {
  const user = await currentUser();
  if (!user) {
    throw new Error("Usuario no autenticado");
  }

  try {
    const task = await prisma.tasks.create({
      data: {
        name,
        category_id,
        user_id: user.id,
      },
    });
    return { success: true, task };
  } catch (error) {
    console.error("Error al crear la tarea:", error);
    return { success: false, error: "Error al crear la tarea" };
  }
};

export const getUserTasks = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error("Usuario no autenticado");
  }

  try {
    const tasks = await prisma.tasks.findMany({
      where: {
        user_id: user.id,
      },
    });
    return { success: true, tasks };
  } catch (error) {
    console.error("Error al obtener las tareas:", error);
    return { success: false, error: "Error al obtener las tareas" };
  }
};
