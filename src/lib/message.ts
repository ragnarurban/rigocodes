"use server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { revalidatePath } from "next/cache";
import * as z from "zod";

import prisma from "./prisma";

const schema = z.object({
  name: z.string().trim().min(3).max(120),
  title: z.string().trim().min(3).max(120),

  message: z
    .string()
    .trim()
    .min(10, {
      message: "Please write a longer message",
    })
    .max(9000),

  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid message" })
    .max(255),
});

export const createMessage = async (prevState: any, formData: FormData) => {
  const { name, title, message, email } = Object.fromEntries(formData);

  const parsed = schema.safeParse({ name, title, message, email });

  if (!parsed.success) {
    console.log("ZOD ERROR ", parsed.error);
    return {
      error: parsed.error.issues[0]?.message ?? "Invalid input",
    };
  }

  console.log(
    `[message.ts] Create message: triggered with ${parsed.data.name} ${parsed.data.title} ${parsed.data.email}`,
  );

  try {
    const result = await prisma.message.create({
      data: {
        name: parsed.data.name,
        title: parsed.data.title,
        message: parsed.data.message,
        email: parsed.data.email,
      },
    });

    console.log(`[message.ts] Created message ${JSON.stringify(result)}`);

    return {
      success: "Form submitted!",
    };
  } catch (e: unknown) {
    // Not working
    console.log("ERROR: ", e);
    const errorObject = e as PrismaClientKnownRequestError;
    return {
      error: `API ERROR: ${errorObject?.meta?.originalMessage}`,
    };
  }
};

export const getMessages = async () => {
  const messages = await prisma.message.findMany();
  return messages;
};

export const deleteMessage = async (id: number) => {
  const message = await prisma.message.delete({
    where: {
      id,
    },
  });
  revalidatePath("/admin");
  return {
    success: `Message ${message.id} deleted succesfully`,
  };
};
