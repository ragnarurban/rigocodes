import { getPosts } from "@/lib/post";

import EmptyCategory from "./empty-category";
import PostCard from "./post-card";

type Props = {
  category?: string;
};

const PostList = async ({ category }: Props) => {
  const posts = await getPosts({ category });
  return (
    <>
      {posts.length === 0 ? (
        <EmptyCategory />
      ) : (
        <>
          <div className="border-t border-border">
            {posts.map((postObj, i) => (
              <PostCard key={postObj.slug} featured={i === 0} post={postObj} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default PostList;
