"use server";

// import { IUser } from "@/types/global";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";


export const addUser = async (formData: FormData) => {
  const { email, name, password } = Object.fromEntries(formData);

  const hashedPassword = await bcrypt.hash(password as string, 10);

  try {
    
    revalidatePath("/");
  } catch (error) {
    console.log(error);
  }
};
