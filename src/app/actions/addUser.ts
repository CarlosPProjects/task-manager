"use server";

// import { IUser } from "@/types/global";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addUser = async (formData: FormData) => {
  const { email, name, password } = Object.fromEntries(formData);

  try {
    await prisma.users.create({
      data: {
        email: email as string,
        name: name as string,
        password: password as string,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
