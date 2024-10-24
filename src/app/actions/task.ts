"use server";

import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import Error from "next/error";

const prisma = new PrismaClient();

export const createTask = async (name: string) => {
  const user = await currentUser();

  if(!user){
    // return new Error();
  }

  await prisma.tasks.create({
    data: {
      name,
      user_id: user?.id,
    },
  });
};