"use client";
import { Pencil } from "lucide-react";

type Props = {
  id: number;
  callback: (id: number) => Promise<{ error?: string; success?: string }>;
};

const EditBtn = ({ id, callback }: Props) => {
  return (
    <button
      onClick={() => callback(id)}
      className="mr-1 inline-flex h-8 items-center gap-1 rounded-md border border-border px-2 text-xs hover:border-accent"
    >
      <Pencil className="h-3 w-3" /> Edit
    </button>
  );
};

export default EditBtn;
