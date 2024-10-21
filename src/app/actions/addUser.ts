"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addUser = async (formData: FormData) => {
  
  const data = Object.fromEntries(formData);

  // const user = await prisma.users.create({
  //   data: {
  //     email: email as string,
  //     name: name as string,
  //     password: password as string
  //   }
  // })
};
