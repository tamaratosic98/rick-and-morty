import { useState } from "react";
import { Character } from "../../models/character";
import { useFavoriteCharacters } from "../../utils/queries";
import { CharacterList } from "./CharacterList";

export const FavoriteCharactersContainer = () => {
  const [filters, setFilters] = useState({});
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useFavoriteCharacters({
    filters,
    query,
    page,
  });

  const setFiltersHandler = (filter: Partial<Character>) => {
    setFilters({ ...filters, ...filter });
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
