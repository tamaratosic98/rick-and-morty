import { useState } from "react";
import { useCharacters } from "../../../../modules/character/character.queries";
import { Character } from "../../../../modules/character/character.types";
import { CharacterList } from "../CharacterList/CharacterList";

export const CharactersContainer = () => {
  const [filters, setFilters] = useState({});
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useCharacters({
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
      setFilters={setFiltersHandler}
      setQuery={setQuery}
      filters={filters}
      setPage={setPage}
      totalPages={data?.pages || 1}
      currentPage={page}
      query={query}
    />
  );
};
