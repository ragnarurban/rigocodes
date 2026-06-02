import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

import { getPosts } from "@/lib/post";

const PostTable = async () => {
  const posts = await getPosts();
  return (
    <div className="overflow-hidden rounded-md border border-border">
      <table className="w-full text-sm">
        <thead className="bg-muted/40 text-left mono text-xs uppercase text-muted-foreground">
          <tr>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Created At</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((p) => (
            <tr key={p.slug} className="border-t border-border">
              <td className="px-4 py-3">
                <div className="font-medium">{p.title}</div>
                <div className="mono text-xs text-muted-foreground">
                  {p.slug}
                </div>
              </td>
              <td className="px-4 py-3 text-muted-foreground">{p.category}</td>
              <td className="px-4 py-3 mono text-xs text-muted-foreground">
                {p.createdAt.toLocaleDateString()}
              </td>
              <td className="px-4 py-3 text-right">
                <Link
                  href={`/admin/posts/edit?id=${p.id}`}
                  className="mr-1 inline-flex h-8 items-center gap-1 rounded-md border border-border px-2 text-xs hover:border-accent"
                >
                  <Pencil className="h-3 w-3" /> Edit
                </Link>
                {/* <DeleteBtn id={p.id} callback={deletePost} /> */}
                <Link
                  // maybe confirm or soft delete
                  href={`/admin/posts/edit?id=${p.id}`}
                  className="inline-flex h-8 items-center gap-1 rounded-md border border-destructive/40 px-2 text-xs text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-3 w-3" /> Delete
                </Link>
              </td>
            </tr>
          ))}
          {posts.length === 0 && (
            <tr>
              <td
                colSpan={4}
                className="px-4 py-8 text-center text-muted-foreground"
              >
                No posts yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PostTable;
