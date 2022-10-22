import { trpc } from "@/utils/trpc";

export default function Home() {
  const pokemon = trpc.getPokemon.useQuery({ name: "ditto" });
  return (
    <div className="flex flex-col items-center justify-center pt-8">
      <div className="flex w-full max-w-xl items-center justify-center gap-2">
        <input
          type="text"
          className="w-64 p-2 text-black"
          placeholder="Search for a Pokemon"
        />
        <button className="rounded border-gray-400 bg-white py-2 px-2 font-semibold text-gray-800 hover:bg-gray-100">
          Search Pokemon
        </button>
      </div>
    </div>
  );
}
