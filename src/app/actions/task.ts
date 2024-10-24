"use server";

import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { IErrorAction } from "../utils/types";

const prisma = new PrismaClient();

export const createTask = async (name: string): Promise<IErrorAction> => {
  const user = await currentUser();

  if (!user) {
    throw new Error("Usuario no autenticado");
  }

  try {
    const task = await prisma.tasks.create({
      data: {
        name,
        user_id: user?.id,
      },
    });

    return { success: true, task };
  } catch (error) {
    console.error("Error al crear la tarea:", error);
    return { success: false, error: "Error al crear la tarea" };
  }
};
