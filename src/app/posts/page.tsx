import { Metadata } from "next";
import Link from "next/link";
import prisma from "../lib/db";
import { createPost } from "../actions/actions";

export const metadata: Metadata = {
  title: "Posts",
};

export default async function Page() {
  const posts = await prisma.post.findMany();

  return (
    <div className="flex">
      <div className="w-full flex justify-center items-center">
        <form action={createPost} className="flex flex-col gap-5 w-1/2">
          <input
            type="text"
            name="title"
            id="title"
            className="border rounded p-2 "
            placeholder="Title"
          />
          <textarea
            name="content"
            id="content"
            className="border rounded p-2"
            placeholder="Content"
          />
          <button
            type="submit"
            className="border rounded bg-black text-white p-2"
          >
            Post
          </button>
        </form>
      </div>

      <div className="w-full h-96 flex justify-center items-center flex-col">
        <h1 className="mb-5 font-bold text-2xl">Posts</h1>
        <div className="flex flex-col gap-4">
          {posts.map((post, index) => (
            <Link href={`posts/${post.id}`}>
              {index + 1}. {post.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
