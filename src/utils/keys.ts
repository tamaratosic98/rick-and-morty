import { createQueryKeys } from "@lukemorales/query-key-factory";
import { Character } from "../models/character";

export const characterKeys = createQueryKeys("characters", {
  detail: (characterId: string) => [characterId],
  list: ({
    filters,
    query,
  }: {
    filters?: Partial<Character>;
    query?: string;
  }) => ({
    queryKey: [filters, query],
  }),
  favoritesList: ({
    filters,
    query,
  }: {
    filters?: Partial<Character>;
    query?: string;
  }) => ({
    queryKey: ["favorites", filters, query],
  }),
});
