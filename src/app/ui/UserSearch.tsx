"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { debounce } from "../lib/debounce";

export default function UserSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleInputChange(e) {
    const params = new URLSearchParams(searchParams);
    if (e.target.value) params.set("name", e.target.value);
    else params.delete("name");
    replace(`${pathname}?${params.toString()}`);
  }

  const debounced = debounce(handleInputChange, 1000);

  return (
    <form className="flex flex-col w-1/2 p-5 gap-5">
      <input
        type="text"
        name="query"
        id="query"
        placeholder="Search names..."
        className="p-2 border-2 rounded"
        onChange={(e) => debounced(e)}
        defaultValue={searchParams.get("name")?.toString()}
      />
    </form>
  );
}
