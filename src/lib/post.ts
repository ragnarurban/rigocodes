"use server";

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { revalidatePath } from "next/cache";
import * as z from "zod";

import prisma from "./prisma";

const schema = z.object({
  title: z.string().trim().min(3).max(120),
  slug: z.string().trim().min(3).max(120),
  category: z.enum(["web-development", "game-development", "showcase"]),
  description: z
    .string()
    .trim()
    .min(10, {
      message: "Please write a longer description for your post",
    })
    .max(2000),
  content: z
    .string()
    .trim()
    .min(10, {
      message: "Please write a longer content for your post",
    })
    .max(9000),
  createdAt: z.date(),
  tags: z.string().trim().min(3).max(120),
  readingTime: z.string().trim().min(3).max(120),
  esTitle: z.string().trim().min(3).max(120),
  esDesc: z
    .string()
    .trim()
    .min(10, {
      message: "Please write a longer translated description for your post",
    })
    .max(2000),
  esBody: z
    .string()
    .trim()
    .min(10, {
      message: "Please write a longer translated content for your post",
    })
    .max(9000),
});

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

export const createPost = async (prevState: any, formData: FormData) => {
  const {
    slug,
    title,
    description,
    category,
    createdAt,
    readingTime,
    tags,
    content,
    esTitle,
    esDesc,
    esBody,
  } = Object.fromEntries(formData);

  const parsed = schema.safeParse({
    slug,
    title,
    description,
    category,
    createdAt: new Date(createdAt as string),
    readingTime,
    tags,
    content,
    esTitle,
    esDesc,
    esBody,
  });
  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Invalid input",
    };
  }

  const finalSlug = parsed.data.slug || slugify(parsed.data.title);
  if (!finalSlug || !title) return;

  // console.log(`[suggest.ts] New posts with:`, {
  //   slug: finalSlug,
  //   title: parsed.data.title,
  //   description: parsed.data.description,
  //   category: parsed.data.category,
  //   createdAt: parsed.data.createdAt,
  //   readingTime: parsed.data.readingTime,
  //   tags: parsed.data.tags.split(", "),
  //   content: parsed.data.content,
  //   translations: {
  //     esTitle: parsed.data.esTitle,
  //     esDesc: parsed.data.esDesc,
  //     esBody: parsed.data.esBody,
  //   },
  // });

  try {
    await prisma.post.create({
      data: {
        title: parsed.data.title,
        slug: parsed.data.slug,
        description: parsed.data.description,
        category: parsed.data.category,
        content: parsed.data.content,
        createdAt: parsed.data.createdAt,
        readingTime: parsed.data.readingTime,
        tags: parsed.data.tags.split(", "),

        esTitle: parsed.data.esTitle,
        esDesc: parsed.data.esDesc,
        esBody: parsed.data.esBody,
      },
    });

    return {
      success: "Form submitted!",
    };
  } catch (e: unknown) {
    const errorObject = e as PrismaClientKnownRequestError;
    return {
      error: `API ERROR: ${errorObject?.meta?.originalMessage}`,
    };
  }
};

export const editPost = async (prevState: any, formData: FormData) => {
  const id = formData.get("id");

  if (!id) {
    return { error: "Post ID is required" };
  }

  const {
    slug,
    title,
    description,
    category,
    createdAt,
    readingTime,
    tags,
    content,
    esTitle,
    esDesc,
    esBody,
  } = Object.fromEntries(formData);

  const parsed = schema.safeParse({
    slug,
    title,
    description,
    category,
    createdAt: new Date(createdAt as string),
    readingTime,
    tags,
    content,
    esTitle,
    esDesc,
    esBody,
  });
  if (!parsed.success) {
    console.log("ERROR ", parsed.error);
    return {
      error: parsed.error.issues[0]?.message ?? "Invalid input",
    };
  }

  const finalSlug = parsed.data.slug || slugify(parsed.data.title);
  if (!finalSlug || !title) return;

  console.log(`[post.ts] Edit posts with:`, {
    slug: finalSlug,
    title: parsed.data.title,
    description: parsed.data.description,
    category: parsed.data.category,
    createdAt: parsed.data.createdAt,
    readingTime: parsed.data.readingTime,
    tags: parsed.data.tags.split(", "),
    content: parsed.data.content,
    translations: {
      esTitle: parsed.data.esTitle,
      esDesc: parsed.data.esDesc,
      esBody: parsed.data.esBody,
    },
  });

  try {
    const result = await prisma.post.update({
      where: {
        id: Number(id),
      },
      data: {
        title: parsed.data.title,
        slug: parsed.data.slug,
        description: parsed.data.description,
        category: parsed.data.category,
        content: parsed.data.content,
        createdAt: parsed.data.createdAt,
        readingTime: parsed.data.readingTime,
        tags: parsed.data.tags.split(", "),

        esTitle: parsed.data.esTitle,
        esDesc: parsed.data.esDesc,
        esBody: parsed.data.esBody,
      },
    });

    console.log(`[posts.ts] Created post ${JSON.stringify(result)}`);

    return {
      success: "Form submitted!",
    };
  } catch (e: unknown) {
    // Not working
    const errorObject = e as PrismaClientKnownRequestError;
    console.log("Error is ", errorObject);
    return {
      error: `API ERROR: ${errorObject?.meta?.originalMessage}`,
    };
  }
};

type PostFilter = {
  category?: string;
  slug?: string;
  id?: number;
};

export const getPosts = async (filters: PostFilter = {}) => {
  const posts = await prisma.post.findMany({ where: filters });
  return posts;
};

export const getPost = async (filters: PostFilter = {}) => {
  const posts = await prisma.post.findFirst({
    where: filters,
  });
  return posts;
};

export const deletePost = async (id: number) => {
  const post = await prisma.post.delete({
    where: {
      id,
    },
  });
  revalidatePath("/admin");
  return {
    success: `Post ${post.id} deleted succesfully`,
  };
};

// const sortPostsDescByDate = (postList) => {
//   return postList.sort(
//     (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
//   );
// };

// Static JSON Index (Small to Mid Blogs): During the build process, generate a search-index.json
// containing the title, description, and slug of every post.
// The client fetches this small file (e.g., 50KB) and performs a local search using Fuse.js.

// Naming Convention: YYYY-MM-DD-slug-title.mdx (e.g., 2026-05-15-optimizing-nextjs-mdx.mdx).

// for locale:
// In Next.js App Router, i18n is handled via a [locale] segment.
//  Your project structure would evolve to: src/app/[locale]/blog/[category]/[slug]/page.tsx.

// Content Organization:

// Plaintext
// /content
//   /en
//     /sports/post-one.mdx
//   /es
//     /sports/post-one.mdx
// Implementation: Use a middleware to detect the user's preferred language and redirect them to the correct locale segment.
//  In your getPost function, pass the locale from the URL to fetch the correct file path:
// const path = \src/content/${locale}/${category}/${slug}.mdx`;`

// Accesibility
// JSON-LD Structured Data: Inject a BlogPosting schema into every page.
// Automatic Heading IDs: Use rehype-slug to automatically add IDs to all h2 and h3 tags.
// This allows users to link directly to sections and helps screen readers navigate the document outline.
