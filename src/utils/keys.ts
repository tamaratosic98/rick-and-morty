import { createQueryKeys } from "@lukemorales/query-key-factory";
import { Character } from "../models/character";

export const characterKeys = createQueryKeys("characters", {
  detail: (characterId: string) => [characterId],
  list: ({ filters }: { filters?: Partial<Character> }) => ({
    queryKey: [filters],
  }),
  favoritesList: ({ filters }: { filters?: Partial<Character> }) => ({
    queryKey: ["favorites", filters],
  }),
});
