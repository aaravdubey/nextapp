import Image from "next/image";
import UserSearch from "../ui/UserSearch";

export default async function Page({ searchParams } : { searchParams: {
  name: string;
} }) {
  const query = searchParams?.name || "";

  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();

  return (
    <div className="flex">
      <UserSearch />

      <div className="flex flex-wrap gap-5 py-5 w-full">
        {users?.map((user, index) => {
          if (user.name.toLowerCase().includes(query.toLowerCase()))
            return (
              <div
                className="rounded-lg p-2 border-2 flex flex-col items-center text-sm"
                key={index}
              >
                <Image
                  src={`https://api.dicebear.com/8.x/croodles-neutral/svg?seed=${user.username}`}
                  width={100}
                  height={100}
                  alt="avatar"
                  className="border-2 rounded-full my-2"
                />
                <p>{user.name}</p>
                <p>@{user.username}</p>
                <p>{user.email}</p>
                <p>{user.phone}</p>
              </div>
            );
        })}
      </div>
    </div>
  );
}
