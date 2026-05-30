"use client";

import { Trash2 } from "lucide-react";

import { deleteSuggestion } from "@/lib/suggest";

type Props = {
  id: number;
  callback: (id: number) => Promise<{ error?: string; success?: string }>;
};

const DeleteBtn = ({ id, callback }: Props) => {
  return (
    <button
      onClick={async () => await callback(id)}
      className="text-muted-foreground hover:text-destructive"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
};

export default DeleteBtn;
