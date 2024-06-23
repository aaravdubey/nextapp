import prisma from "@/app/lib/db";
import Image from "next/image";
import { unstable_cache as cache } from "next/cache";

const getCachedPost = cache(async (id) => {
  return await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      author: true,
    },
  })
});

export default async function Page({ params }: {
  params: {
    id: string;
  }
}) {
  const id = +params.id;
  const post = await getCachedPost(id);

  return (
    <div className="w-full h-96 flex flex-col gap-4 justify-center items-center">
      <Image
        src={`https://picsum.photos/seed/${id}/200/300?grayscale`}
        alt=""
        width={200}
        height={200}
        className="rounded-lg"
      />
      <h1 className="font-bold">{post?.title}</h1>
      <p>{post?.content}</p>
      <p className="text-sm">~{post?.author.name}</p>
    </div>
  );
}

// OR
// export default function Page() {
//   const pathname = usePathname();
//   const id = pathname.split("/").pop();

//   return (
//     <div className="w-full h-96 flex flex-col gap-4 justify-center items-center">
//       <Image src={`https://picsum.photos/seed/${id}/200/300?grayscale`} alt="" width={200} height={200} className="rounded-lg" />
//       <h1>Posts {id}</h1>
//     </div>
//   );
// }
