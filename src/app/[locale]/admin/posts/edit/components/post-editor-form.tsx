"use client";
import { Check } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";

import { categories } from "@/constants";

import { Input } from "../../../components/input";

type Props = {
  initialPost: Record<string, any> | null; // update to post schema,
  action: any; // update to action callback
  isEdit: boolean;
};

type FormState = {
  error?: string;
  success?: string;
};

const initialState: FormState = {};

const PostEditorForm = ({ initialPost, action, isEdit }: Props) => {
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <div className="mt-4">
      {state?.success && (
        <div className="mt-8 flex items-center gap-3 rounded-md border border-green-text-green-400/40 bg-green-text-green-400/10 p-4 text-green-400 mb-8">
          <Check className="h-5 w-5" /> MODULARIZE MESSAGE:{" "}
          {isEdit ? "Post updated!" : "Post created!"}
        </div>
      )}

      <form action={formAction} className="grid gap-6 lg:grid-cols-2">
        {isEdit && initialPost?.id && (
          <input type="hidden" name="id" value={initialPost.id} />
        )}
        <div className="space-y-4">
          <h2 className="mono text-xs uppercase tracking-widest text-muted-foreground">
            English
          </h2>
          <Input
            label="Title"
            name="title"
            required
            defaultValue={initialPost?.title}
          />
          <Input label="Slug" name="slug" defaultValue={initialPost?.slug} />
          <Input
            label="Description"
            name="description"
            defaultValue={initialPost?.description}
          />
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="mono mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
                Category
              </span>
              <select
                name="category"
                className="h-11 w-full rounded-md border border-border bg-background px-3 text-sm"
                defaultValue={initialPost?.categoryId || initialPost?.category}
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </label>
            <Input
              label="Date"
              type="date"
              name="createdAt"
              defaultValue={
                initialPost?.createdAt
                  ? initialPost.createdAt.toISOString().split("T")[0]
                  : ""
              }
            />
          </div>
          <Input
            label="Reading time"
            name="readingTime"
            defaultValue={initialPost?.readingTime}
          />
          <Input
            label="Tags (comma separated)"
            name="tags"
            defaultValue={initialPost?.tags}
          />
          <label className="block">
            <span className="mono mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
              Body
            </span>
            <textarea
              name="content"
              rows={14}
              className="w-full rounded-md border border-border bg-background p-3 text-sm font-mono outline-none focus:border-ring"
              defaultValue={initialPost?.content}
            />
          </label>
        </div>

        <div className="space-y-4">
          <h2 className="mono text-xs uppercase tracking-widest text-muted-foreground">
            Translation
          </h2>
          <Input
            label="Título"
            name="esTitle"
            defaultValue={initialPost?.esTitle}
          />
          <Input
            label="Descripción"
            name="esDesc"
            defaultValue={initialPost?.esDesc}
          />
          <label className="block">
            <span className="mono mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
              Cuerpo
            </span>
            <textarea
              name="esBody"
              rows={14}
              className="w-full rounded-md border border-border bg-background p-3 text-sm font-mono outline-none focus:border-ring"
              defaultValue={initialPost?.esBody}
            />
          </label>
          {state?.error && (
            <p className="text-sm text-destructive">
              MODULARIZE {state?.error}
            </p>
          )}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="inline-flex h-11 items-center rounded-md bg-foreground px-6 text-sm font-medium text-background hover:opacity-90"
            >
              {isPending
                ? isEdit
                  ? "Updating..."
                  : "Creating..."
                : isEdit
                  ? "Update Post"
                  : "Create Post"}
            </button>
            <Link
              href="/admin/posts"
              className="inline-flex h-11 items-center rounded-md border border-border px-6 text-sm"
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostEditorForm;
