"use server";

import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createTask = async (name: string) => {
  const user = await currentUser();

  await prisma.tasks.create({
    data: {
      name,
      user_id: user?.id,
    },
  });
};