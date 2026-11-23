"use server";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import * as z from "zod";

import { Prisma } from "@/generated/prisma/client";

import prisma from "./prisma";
import { requireAdmin } from "./require-admin";
import { isLikelyBot, RATE_LIMIT_MAX, rateLimitSince } from "./spam";

const schema = z.object({
  topic: z.string().trim().min(3).max(120),
  category: z.coerce.number().int().positive(),
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

export const createSuggestion = async (_prevState: any, formData: FormData) => {
  // Pretend bots succeeded so they don't learn to work around the checks.
  if (isLikelyBot(formData)) {
    return { success: "Form submitted!" };
  }

  const t = await getTranslations("Forms");
  const { topic, category, details, email } = Object.fromEntries(formData);

  const parsed = schema.safeParse({ topic, category, details, email });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Invalid input",
    };
  }

  try {
    const recent = await prisma.suggestion.count({
      where: {
        email: { equals: parsed.data.email, mode: "insensitive" },
        createdAt: { gte: rateLimitSince() },
      },
    });
    if (recent >= RATE_LIMIT_MAX) {
      return { error: t("tooManyRequests") };
    }

    // The unique index on `topic` is case-sensitive, so also catch
    // "React Hooks" vs "react hooks" here.
    const existing = await prisma.suggestion.findFirst({
      where: { topic: { equals: parsed.data.topic, mode: "insensitive" } },
      select: { id: true },
    });
    if (existing) {
      return { error: t("duplicateTopic") };
    }

    await prisma.suggestion.create({
      data: {
        topic: parsed.data.topic,
        categoryId: parsed.data.category,
        details: parsed.data.details,
        email: parsed.data.email,
      },
    });

    return {
      success: "Form submitted!",
    };
  } catch (e: unknown) {
    // Two identical topics submitted at the same time: the unique index wins.
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === "P2002"
    ) {
      return { error: t("duplicateTopic") };
    }
    console.error("[suggest.ts] Failed to create suggestion", e);
    return { error: t("genericError") };
  }
};

export const deleteSuggestion = async (id: number) => {
  await requireAdmin();
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
