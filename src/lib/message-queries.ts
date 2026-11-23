import "server-only";

import prisma from "./prisma";
import { requireAdmin } from "./require-admin";

export const getMessages = async () => {
  await requireAdmin();
  return prisma.message.findMany();
};
