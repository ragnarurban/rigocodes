import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import TableSkeleton from "@/components/table-skeleton";

import PostTable from "./components/post-table";

const Page = async () => {
  return (
    <div>
      <div className="mb-4 flex justify-end">
        <Link
          href="/admin/posts/edit"
          className="inline-flex h-10 items-center gap-2 rounded-md bg-foreground px-4 text-sm font-medium text-background hover:opacity-90 mt-4"
        >
          <Plus className="h-4 w-4" /> New Post
        </Link>
      </div>

      <Suspense fallback={<TableSkeleton />}>
        <PostTable />
      </Suspense>
    </div>
  );
};

export default Page;
