import { createPost, editPost, getPost } from "@/lib/post";

import PostEditorForm from "./components/post-editor-form";

type Props = {
  searchParams: { id?: number };
};

const Page = async ({ searchParams }: Props) => {
  let post = null;
  let action = createPost;
  const { id } = await searchParams;

  if (id) {
    post = await getPost({ id: Number(id) });
    action = editPost;
  }

  return <PostEditorForm initialPost={post} action={action} isEdit={!!id} />;
};

export default Page;
