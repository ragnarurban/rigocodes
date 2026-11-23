import "server-only";

import prisma from "./prisma";
import { requireAdmin } from "./require-admin";

export const getSuggestions = async () => {
  await requireAdmin();
  return prisma.suggestion.findMany({
    include: { category: true },
  });
};
