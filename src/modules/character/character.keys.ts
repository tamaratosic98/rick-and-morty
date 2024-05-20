import { createQueryKeys } from '@lukemorales/query-key-factory';
import { Character } from './character.types';

export const characterKeys = createQueryKeys('characters', {
  detail: (characterId: string) => [characterId],
  list: ({ filters, query, page }: { filters?: Partial<Character>; query?: string; page?: number }) => ({
    queryKey: [filters, query, page],
  }),
  favoritesList: ({ filters, query, page }: { filters?: Partial<Character>; query?: string; page?: number }) => ({
    queryKey: ['favorites', filters, query, page],
  }),
});
