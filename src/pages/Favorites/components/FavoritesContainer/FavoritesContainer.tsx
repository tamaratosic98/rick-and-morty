import { useState } from 'react';
import { useFavoriteCharacters } from '../../../../modules/character/character.queries';
import { Character } from '../../../../modules/character/character.types';
import { CharacterList } from '../../../Home/components/CharacterList/CharacterList';

export const FavoriteCharactersContainer = () => {
  const [filters, setFilters] = useState({});
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading } = useFavoriteCharacters({
    filters,
    query,
    page,
  });

  const setFiltersHandler = (filter: Partial<Character>) => {
    setFilters({ ...(filters ?? {}), ...filter });
  };

  return (
    <CharacterList
      characters={data?.results ?? []}
      isLoading={isLoading}
      filters={filters}
      setFilters={setFiltersHandler}
      setQuery={setQuery}
      setPage={setPage}
      totalPages={data?.pages || 1}
      currentPage={page}
      query={query}
    />
  );
};
