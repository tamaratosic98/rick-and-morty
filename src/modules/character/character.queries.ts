import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import to from 'await-to-js';
import { GetResponse } from '../../utils/types';
import { useFavorites } from './character.hooks';
import { characterKeys } from './character.keys';
import { CharacterService, applyPagination, queryAllCharacters } from './character.service';
import { characterStore } from './character.store';
import { Character } from './character.types';

export function useCharacters({
  filters,
  query,
  page,
}: {
  filters?: Partial<Character>;
  query?: string;
  page?: number;
}) {
  return useQuery({
    ...characterKeys.list({ filters, query, page }),
    queryFn: async () => {
      const [error, response] = await to(CharacterService.getCharacters({ filters, page }));

      if (!error) {
        const { results: characters, pages } = response;

        return { results: queryAllCharacters(characters, query), pages };
      }

      throw error;
    },
    retry: false,
  });
}

export function useFavoriteCharacters({
  filters,
  query,
  page,
}: {
  filters?: Partial<Character>;
  query?: string;
  page?: number;
}) {
  const { favorites } = useFavorites();

  return useQuery({
    ...characterKeys.favoritesList({ filters, query, page }),
    queryFn: async () => {
      const [error, response] = await to(
        CharacterService.getFavoriteCharacters({
          ids: favorites,
        })
      );

      if (!error) {
        const { results: characters, pages } = response;

        characterStore.setFavorites(response.results);

        return {
          results: applyPagination(queryAllCharacters(characters, query, filters), page ?? 1),
          pages,
        };
      }

      throw error;
    },
  });
}

export function useCharacter({ characterId, isModified }: { characterId: string; isModified: boolean }) {
  return useQuery({
    queryKey: [
      'character',
      {
        characterId,
        isModified,
      },
    ],
    queryFn: () => CharacterService.getCharacter({ characterId }),
  });
}

export function useOptimisticUpdateCharacter() {
  const queryClient = useQueryClient();

  return useMutation({
    onMutate: async ({
      newCharacter,
      filters,
      page,
      query,
    }: {
      newCharacter: Character;
      filters: Partial<Character>;
      page: number;
      query: string;
    }) => {
      if (!newCharacter) {
        return;
      }

      const keys = window.location?.href?.includes('favorites')
        ? characterKeys.favoritesList({ filters, page, query })?.queryKey
        : characterKeys.list({ filters, page, query })?.queryKey;

      await queryClient.cancelQueries({ queryKey: keys });

      characterStore.setModifiedCharacters(newCharacter);

      const data = queryClient.getQueryData(keys) || [];

      queryClient.setQueryData(keys, () => {
        return {
          results: (data as GetResponse<Character[]>).results.map((character: Character) => {
            if (character.id === newCharacter.id) {
              return {
                ...character,
                ...newCharacter,
              };
            }
            return character;
          }),
          pages: (data as GetResponse<Character[]>).pages,
        };
      });

      return { previousCharacters: (data as GetResponse<Character[]>).results };
    },
    onError: (_err, _newCharacter, context) => {
      queryClient.setQueryData(['characters'], context?.previousCharacters);
    },
  });
}
