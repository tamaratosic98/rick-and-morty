import { useState } from 'react';
import { useFavoriteCharacters } from '../../../../modules/character/character.queries';
import { Character } from '../../../../modules/character/character.types';
import { CharacterList } from '../../../Home/components/CharacterList/CharacterList';
import { characterStore } from '../../../../modules/character/character.store';
import { PAGINATION_INITIAL_STATE } from '../../../../modules/character/character.constants';

export const FavoriteCharactersContainer = () => {
  const [filters, setFilters] = useState({});
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(PAGINATION_INITIAL_STATE);

  const setPageHandler = (value: number) => {
    setPage(value);
    characterStore.setPagination(value);
  };

  const { data, isLoading } = useFavoriteCharacters({
    filters,
    query,
    page,
  });

  const setFiltersHandler = (filter: Partial<Character>) => {
    setPageHandler(PAGINATION_INITIAL_STATE);
    setFilters({ ...(filters ?? {}), ...filter });
  };

  return (
    <CharacterList
      characters={data?.results ?? []}
      isLoading={isLoading}
      filters={filters}
      setFilters={setFiltersHandler}
      setQuery={setQuery}
      setPage={setPageHandler}
      totalPages={data?.pages}
      currentPage={page}
      query={query}
    />
  );
};
