import "server-only";

import { headers } from "next/headers";

import { auth } from "./auth";

export class UnauthorizedError extends Error {
  constructor() {
    super("Unauthorized");
    this.name = "UnauthorizedError";
  }
}

/**
 * Ensures the current request belongs to the admin. Call it at the top of
 * every mutating or private server action and admin-only read.
 *
 * Sign-up is enabled in better-auth, so a session alone is not enough: the
 * session user must also be ADMIN_EMAIL.
 */
export async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!session || !adminEmail || session.user.email !== adminEmail) {
    throw new UnauthorizedError();
  }

  return session;
}
