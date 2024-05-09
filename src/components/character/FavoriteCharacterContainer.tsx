import { useState } from "react";
import { Character } from "../../models/character";
import { useFavoriteCharacters } from "../../utils/queries";
import { CharacterList } from "./CharacterList";

export const FavoriteCharactersContainer = () => {
  const [filters, setFilters] = useState({});
  const [query, setQuery] = useState("");

  const { data: characters, isLoading } = useFavoriteCharacters({
    filters,
    query,
  });

  const setFiltersHandler = (filter: Partial<Character>) => {
    setFilters({ ...filters, ...filter });
  };

  return (
    <CharacterList
      characters={characters ?? []}
      isLoading={isLoading}
      filters={filters}
      setFilters={setFiltersHandler}
      setQuery={setQuery}
    />
  );
};
