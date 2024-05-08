import { useState } from "react";
import { Character } from "../../models/character";
import { useCharacters } from "../../utils/queries";
import { CharacterList } from "./CharacterList";

export const CharactersContainer = () => {
  const [filters, setFilters] = useState({});
  const { data: characters, isLoading } = useCharacters({ filters });

  const setFiltersHandler = (filter: Partial<Character>) => {
    setFilters({ ...filters, ...filter });
  };

  return (
    <CharacterList
      characters={characters ?? []}
      isLoading={isLoading}
      setFilters={setFiltersHandler}
      filters={filters}
    />
  );
};
