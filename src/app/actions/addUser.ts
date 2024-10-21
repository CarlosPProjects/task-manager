"use server";

// import { IUser } from "@/types/global";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const addUser = async (formData: FormData) => {
  const { email, name, password } = Object.fromEntries(formData);

  const hashedPassword = await bcrypt.hash(password as string, 10);

  try {
    await prisma.users.create({
      data: {
        email: email as string,
        name: name as string,
        password: hashedPassword,
      },
    });
    revalidatePath("/");
  } catch (error) {
    console.log(error);
  }
};
