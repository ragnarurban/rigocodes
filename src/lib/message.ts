"use server";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import * as z from "zod";

import prisma from "./prisma";
import { requireAdmin } from "./require-admin";
import {
  countLinks,
  isLikelyBot,
  MAX_LINKS,
  RATE_LIMIT_MAX,
  rateLimitSince,
} from "./spam";

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

export const createMessage = async (_prevState: any, formData: FormData) => {
  // Pretend bots succeeded so they don't learn to work around the checks.
  if (isLikelyBot(formData)) {
    return { success: "Form submitted!" };
  }

  const t = await getTranslations("Forms");
  const { name, title, message, email } = Object.fromEntries(formData);

  const parsed = schema.safeParse({ name, title, message, email });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Invalid input",
    };
  }

  if (countLinks(`${parsed.data.title} ${parsed.data.message}`) > MAX_LINKS) {
    return { error: t("tooManyLinks") };
  }

  try {
    const recent = await prisma.message.count({
      where: {
        email: { equals: parsed.data.email, mode: "insensitive" },
        createdAt: { gte: rateLimitSince() },
      },
    });
    if (recent >= RATE_LIMIT_MAX) {
      return { error: t("tooManyRequests") };
    }

    await prisma.message.create({
      data: {
        name: parsed.data.name,
        title: parsed.data.title,
        message: parsed.data.message,
        email: parsed.data.email,
      },
    });

    return {
      success: "Form submitted!",
    };
  } catch (e: unknown) {
    console.error("[message.ts] Failed to create message", e);
    return { error: t("genericError") };
  }
};

export const deleteMessage = async (id: number) => {
  await requireAdmin();
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
