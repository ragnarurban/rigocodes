"use client";

import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";

import { authClient } from "@/lib/auth-client";

type Props = {};

const LogoutBtn = (props: Props) => {
  return (
    <button
      onClick={async () =>
        authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              redirect("/login"); // redirect to login page
            },
          },
        })
      }
      className="inline-flex h-9 items-center gap-2 rounded-md border border-border px-3 text-sm hover:border-accent"
    >
      <LogOut className="h-4 w-4" /> Logout
    </button>
  );
};

export default LogoutBtn;
