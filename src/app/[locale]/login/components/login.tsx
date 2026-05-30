"use client";
import { Lock } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useActionState } from "react";

import { adminLogin } from "@/lib/auth-server";


type Props = {};

const initialState = {
  error: null,
  success: null,
};

const Login = (props: Props) => {
  const [state, action, isPending] = useActionState(adminLogin, initialState);
  if (state.success) {
    redirect("/admin");
  }
  return (
    <section className="container-narrow py-24">
      <div className="mx-auto max-w-sm">
        <div className="mb-4 inline-grid h-12 w-12 place-items-center rounded-xl bg-accent/15 text-accent">
          <Lock className="h-5 w-5" />
        </div>
        <h1 className="font-display text-3xl font-semibold">Admin dashboard</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter your admin password.
        </p>
        <form action={action} className="mt-6 space-y-4">
          <input
            type="password"
            name="password"
            autoFocus
            placeholder="password"
            className="h-11 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-ring"
          />
          {state.error && (
            <p className="text-sm text-destructive">{state.error}</p>
          )}
          <button
            disabled={isPending}
            type="submit"
            className="inline-flex h-11 w-full items-center justify-center rounded-md bg-foreground text-sm font-medium text-background hover:opacity-90"
          >
            Login
          </button>
          <Link
            href="/"
            className="block text-center mono text-xs text-muted-foreground hover:text-accent"
          >
            ← Home
          </Link>
        </form>
      </div>
    </section>
  );
};

export default Login;
