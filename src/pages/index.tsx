import { trpc } from "@/utils/trpc";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
import React from "react";
import Image from "next/image";

export default function Home() {
  const { data, mutateAsync, isSuccess } = trpc.getPokemon.useMutation();

  const onSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    let searchTerm: string | number = form.q.value;
    if (Number.isInteger(searchTerm)) {
      searchTerm = Number(searchTerm);
    }
    await mutateAsync({ q: searchTerm });
  };

  return (
    <div className="flex flex-col items-center justify-center pt-8">
      <form
        onSubmit={onSearch}
        className="flex w-full max-w-xl items-center justify-center gap-2 border border-gray-400"
      >
        <input
          name="q"
          type="search"
          className="w-full border-none bg-gray-800 p-2 text-white outline-none"
          placeholder="Search for a Pokemon"
        />
        <button
          type="submit"
          className="border-l border-gray-400 bg-gray-800 py-2 px-4 font-semibold text-gray-800 hover:bg-gray-600"
        >
          <MagnifyingGlassIcon className="h-6 w-6 text-white" />
        </button>
      </form>
      <div className="mt-8 w-full max-w-xl border">
        {isSuccess && data && (
          <>
            <div className="flex w-full justify-end">
              <HeartIcon className="mt-4 mr-4 h-6 w-6" />
            </div>
            <div className="flex flex-col items-center justify-center">
              <Image
                width={256}
                height={256}
                alt=""
                className="h-64 w-64"
                src={`https://github.com/HybridShivam/Pokemon/blob/master/assets/images/${data.id
                  .toString()
                  .padStart(3, "0")}.png?raw=true`}
                layout="fixed"
              />
              <p className="pt-8">{data?.name}</p>
              <div className="flex w-full items-center justify-between p-8">
                <span>order: {data?.order} </span>
                <span>weight: {data?.weight} </span>
                <span>height: {data?.height} </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
