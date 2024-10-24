"use server";

import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { IErrorAction } from "../utils/types";

const prisma = new PrismaClient();

export const createTask = async (name: string) => {
  const user = await currentUser();
  if (!user) {
    throw new Error("Usuario no autenticado");
  }

  await prisma.tasks.create({
    data: {
      name,
      user_id: user?.id,
    },
  });
};