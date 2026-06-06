"use server";

import prisma from "./prisma";

export const getCategories = async () => {
  try {
    const categories = await prisma.category.findMany({
      where: {
        id: { not: 1 },
      },
    });
    return categories;
  } catch {
    // error handling, for now pass
    return [];
  }
};

export const getCategory = async (key: string) => {
  try {
    const category = await prisma.category.findFirst({
      where: {
        key,
      },
    });
    return category;
  } catch {
    // error handling, for now pass
    return false;
  }
};
