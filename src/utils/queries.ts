import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Character } from "../models/character";
import { CharacterService } from "../service/character.service";

export function useCharacters({
  filters,
}: { filters?: Partial<Character> } = {}) {
  return useQuery({
    queryKey: ["characters"],
    queryFn: CharacterService.getCharacters,
  });
}

export function useCharacter({ characterId }: { characterId: string }) {
  return useQuery({
    queryKey: ["character", { characterId }],
    queryFn: () => CharacterService.getCharacter({ characterId }),
  });
}

// If it was real data we would use this approach
// export function useUpdateCharacter({ name }: { name: string }) {
//   const queryClient = useQueryClient();
//   return useMutation({
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["characters"] });
//     },
//   });
// }

export function useOptimisticUpdateCharacter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newCharacter: Character) => {
      console.log("newCharacter", newCharacter);
    },
    onMutate: async (newCharacter: Character) => {
      await queryClient.cancelQueries({ queryKey: ["characters"] });

      const previousCharacters: Character[] =
        queryClient.getQueryData(["characters"]) || [];

      console.log(
        "previousCharacters",
        queryClient.getQueryData(["characters"])
      );

      queryClient.setQueryData(["characters"], (old: Character[]) => {
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
