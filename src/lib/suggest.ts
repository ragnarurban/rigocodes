"use server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { revalidatePath } from "next/cache";
import * as z from "zod";

import prisma from "./prisma";

const schema = z.object({
  topic: z.string().trim().min(3).max(120),
  category: z.number().min(2).max(4),
  details: z
    .string()
    .trim()
    .min(10, {
      message: "Please write a longer description for your suggestion",
    })
    .max(2000),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid message" })
    .max(255),
});

export const createSuggestion = async (prevState: any, formData: FormData) => {
  const { topic, category, details, email } = Object.fromEntries(formData);

  const parsed = schema.safeParse({ topic, category, details, email });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Invalid input",
    };
  }

  try {
    const result = await prisma.suggestion.create({
      data: {
        topic: parsed.data.topic,
        categoryId: parsed.data.category,
        details: parsed.data.details,
        email: parsed.data.email,
      },
    });

    console.log(`[suggest.ts] Created suggestion ${JSON.stringify(result)}`);

    return {
      success: "Form submitted!",
    };
  } catch (e: unknown) {
    // Not working
    const errorObject = e as PrismaClientKnownRequestError;
    return {
      error: `API ERROR: ${errorObject?.meta?.originalMessage}`,
    };
  }
};

export const getSuggestions = async () => {
  const suggestions = await prisma.suggestion.findMany();
  return suggestions;
};

export const deleteSuggestion = async (id: number) => {
  const suggestion = await prisma.suggestion.delete({
    where: {
      id,
    },
  });
  revalidatePath("/admin");
  return {
    success: `Suggestion ${suggestion.id} deleted succesfully`,
  };
};
