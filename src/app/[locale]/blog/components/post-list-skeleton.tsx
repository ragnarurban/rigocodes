import { Skeleton } from "@/components/ui/skeleton";

const PostListSkeleton = () => {
  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Skeleton className="h-4 w-2/4" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/4" />
    </div>
  );
};

export default PostListSkeleton;
