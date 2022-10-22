import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { PokemonClient } from "pokenode-ts";

export const appRouter = router({
  getPokemon: publicProcedure
    .input(
      z.object({
        name: z.union([z.string(), z.number()]),
      })
    )
    .query(async ({ input }) => {
      const pokemonApi = new PokemonClient();
      const searchTerm = input.name;
      const getPokemon = (searchTerm: string | number) => {
        return typeof searchTerm === "string"
          ? pokemonApi.getPokemonByName(searchTerm)
          : pokemonApi.getPokemonById(searchTerm);
      };
      const pokemon = await getPokemon(searchTerm);
      if (!pokemon) throw new Error(`This pokemon does not exist`);
      return pokemon;
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
