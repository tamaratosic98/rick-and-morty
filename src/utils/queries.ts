import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFavorites } from "../hooks/useFavorites";
import { Character } from "../models/character";
import { CharacterService } from "../service/character.service";
import { characterKeys } from "../utils/keys";
export function useCharacters({ filters }: { filters?: Partial<Character> }) {
  return useQuery({
    ...characterKeys.list({ filters }),
    retry: false,
  });
}

export function useFavoriteCharacters({
  filters,
}: {
  filters?: Partial<Character>;
}) {
  const { favorites } = useFavorites();

  return useQuery({
    ...characterKeys.favoritesList({ filters }),
    queryFn: () => {
      return CharacterService.getFavoriteCharacters({
        ids: favorites,
        filters,
      });
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

      console.log(keys, window.location.href.includes("favorites"));
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
