import { useState } from "react";
import { Character } from "../../models/character";
import { useCharacters } from "../../utils/queries";
import { CharacterList } from "./CharacterList";

export const CharactersContainer = () => {
  const [filters, setFilters] = useState({});
  const [query, setQuery] = useState("");

  const { data: characters, isLoading } = useCharacters({ filters, query });

  const setFiltersHandler = (filter: Partial<Character>) => {
    setFilters({ ...filters, ...filter });
  };

  return (
    <CharacterList
      characters={characters ?? []}
      isLoading={isLoading}
      setFilters={setFiltersHandler}
      setQuery={setQuery}
      filters={filters}
    />
  );
};
