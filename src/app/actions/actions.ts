"use server";

import { revalidatePath } from "next/cache";
import prisma from "../lib/db";

export async function createPost(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    await prisma.post.create({
      data: {
        title,
        content,
        authorId: 1,
      },
    });
    revalidatePath("/posts");
    
  } catch (error) {
    console.log(error);
  }
}