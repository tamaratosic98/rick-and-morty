import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Character } from "../models/character";
import { CharacterService } from "../service/character.service";

export function useCharacters({
  filters,
}: { filters?: Partial<Character> } = {}) {
  return useQuery({
    queryKey: ["characters", { filters }],
    queryFn: CharacterService.getCharacters,
  });
}

export function useCharacter({ characterId }: { characterId: string }) {
  return useQuery({
    queryKey: ["character", { characterId }],
    queryFn: () => CharacterService.getCharacter({ characterId }),
  });
}

export function useUpdateCharacter({ name }: { name: string }) {
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["characters"] });
    },
  });
}
