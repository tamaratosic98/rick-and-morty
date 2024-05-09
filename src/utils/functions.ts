import { Character } from "../models/character";
import { SEARCHABLE_CHARACTER_FIELDS } from "./constants";

export const queryAllCharacters = (
  characters: Array<Character>,

  query?: string
) => {
  if (!query) {
    return characters;
  }

  return characters.filter((character) => {
    if (
      SEARCHABLE_CHARACTER_FIELDS.some((field) =>
        character[field as keyof Character]
          ?.toString()
          ?.toLowerCase()
          ?.includes(query.toLowerCase())
      )
    ) {
      return character;
    }
  });
};
