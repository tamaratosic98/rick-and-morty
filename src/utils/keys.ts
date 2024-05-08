import { createQueryKeys } from "@lukemorales/query-key-factory";
import { Character } from "../models/character";
import { CharacterService } from "../service/character.service";

export const characterKeys = createQueryKeys("characters", {
  detail: (characterId: string) => [characterId],
  list: ({ filters }: { filters?: Partial<Character> }) => ({
    queryKey: [filters],
    queryFn: () => CharacterService.getCharacters({ filters }),
  }),
  favoritesList: ({ filters }: { filters?: Partial<Character> }) => ({
    queryKey: ["favorites", filters],
  }),
});
