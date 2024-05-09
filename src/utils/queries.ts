import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import to from "await-to-js";
import { useFavorites } from "../hooks/useFavorites";
import { Character } from "../models/character";
import { CharacterService } from "../service/character.service";
import { characterKeys } from "../utils/keys";
import { queryAllCharacters } from "./functions";

export function useCharacters({
  filters,
  query,
}: {
  filters?: Partial<Character>;
  query?: string;
}) {
  return useQuery({
    ...characterKeys.list({ filters, query }),
    queryFn: async () => {
      const [error, characters] = await to(
        CharacterService.getCharacters({ filters })
      );

      if (!error) {
        return queryAllCharacters(characters, query);
      }

      throw error;
    },
    retry: false,
  });
}

export function useFavoriteCharacters({
  filters,
  query,
}: {
  filters?: Partial<Character>;
  query?: string;
}) {
  const { favorites } = useFavorites();

  return useQuery({
    ...characterKeys.favoritesList({ filters, query }),
    queryFn: async () => {
      const [error, characters] = await to(
        CharacterService.getFavoriteCharacters({
          ids: favorites,
          filters,
        })
      );

      if (!error) {
        return queryAllCharacters(characters, query);
      }

      throw error;
    },
  });
}

export function useCharacter({ characterId }: { characterId: string }) {
  return useQuery({
    queryKey: ["character", { characterId }],
    queryFn: () => CharacterService.getCharacter({ characterId }),
  });
}

export function useOptimisticUpdateCharacter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({}: {
      newCharacter: Character;
      filters: Partial<Character>;
    }) => {},
    onMutate: async ({
      newCharacter,
      filters,
    }: {
      newCharacter: Character;
      filters: Partial<Character>;
    }) => {
      const keys = window.location.href.includes("favorites")
        ? characterKeys.favoritesList({ filters }).queryKey
        : characterKeys.list({ filters }).queryKey;

      await queryClient.cancelQueries({ queryKey: keys });

      const previousCharacters: Character[] =
        queryClient.getQueryData(keys) || [];

      queryClient.setQueryData(keys, (_old: Character[]) => {
        return previousCharacters.map((character) => {
          if (character.id === newCharacter.id) {
            return {
              ...character,
              ...newCharacter,
            };
          }
          return character;
        });
      });

      return { previousCharacters };
    },
    onError: (_err, _newCharacter, context) => {
      queryClient.setQueryData(["characters"], context?.previousCharacters);
    },
  });
}
