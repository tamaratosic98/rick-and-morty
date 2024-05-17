import to from "await-to-js";
import axios from "axios";
import { GetResponse } from "../../utils/types";
import {
  CHARACTER_BASE_URL,
  SEARCHABLE_CHARACTER_FIELDS,
} from "./character.constants";
import { characterStore } from "./character.store";
import { Character } from "./character.types";
// #region | Helper Functions

export const filterByField = (
  filters: Partial<Character>,
  character: Character
) => {
  const keys = Object.keys(filters) as Array<keyof Character>;

  return keys.every((key) => {
    const filterValue = filters[key]!.toString().toLowerCase();

    return character[key]?.toString()?.toLowerCase()?.includes(filterValue);
  });
};

export const queryAllCharacters = (
  characters: Array<Character>,
  query?: string,
  filters?: Partial<Character>
) => {
  if (!query && (!filters || Object.keys(filters)?.length === 0)) {
    return characters;
  }

  return characters.filter((character) => {
    if (
      SEARCHABLE_CHARACTER_FIELDS.some(
        (field) =>
          query &&
          character[field as keyof Character]
            ?.toString()
            ?.toLowerCase()
            ?.includes(query.toLowerCase())
      ) ||
      (filters && filterByField(filters, character))
    ) {
      return character;
    }
  });
};

const handleModifiedCharacters = (characters: Character[]) => {
  return characters?.map((character) => {
    if (characterStore.isCharacterModified(character)) {
      return {
        ...character,
        ...characterStore.getModifiedCharacter(character),
      } as Character;
    }

    return character;
  });
};

// #endregion

const characterApi = axios.create({
  baseURL: CHARACTER_BASE_URL,
});

export const CharacterService = {
  async getCharacters({
    filters,
    page,
  }: {
    filters?: Partial<Character>;
    page?: number;
  }): Promise<GetResponse<Character[]>> {
    const response = await characterApi.get("/character", {
      params: { ...filters, page },
    });

    return {
      results: handleModifiedCharacters(response.data?.results) || [],
      total: response.data?.info?.count,
      pages: response.data?.info?.pages || 1,
    };
  },

  async getFavoriteCharacters({
    ids,
  }: {
    ids?: string[];
  } = {}): Promise<GetResponse<Character[]>> {
    if (!ids?.length) {
      return { results: [], total: 0, pages: 0 };
    }

    const response = await characterApi.get(`/character/${ids?.join(",")}`);

    return Array.isArray(response?.data)
      ? {
          results: handleModifiedCharacters(response?.data),
          total: response?.data?.length || 0,
          pages: 1,
        }
      : { results: [response?.data], total: 1, pages: 1 };
  },

  async getCharacter({
    characterId,
  }: {
    characterId: string;
  }): Promise<Character> {
    const [error, response] = await to(
      characterApi.get(`/character/${characterId}`)
    );
    if (error) {
      throw error;
    }

    return {
      ...response?.data,
      ...(characterStore.getModifiedCharacter(response?.data) ?? {}),
    };
  },
};
