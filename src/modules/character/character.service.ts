import axios from "axios";
import { GetResponse } from "../../utils/types";
import {
  CHARACTER_BASE_URL,
  SEARCHABLE_CHARACTER_FIELDS,
} from "./character.constants";
import { Character } from "./character.types";

// #region | Helper Functions

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
      results: response.data?.results || [],
      total: response.data?.info?.count,
      pages: response.data?.info?.pages || 1,
    };
  },

  async getFavoriteCharacters({
    ids,
    filters,
    page,
  }: {
    ids?: string[];
    filters?: Partial<Character>;
    page?: number;
  } = {}): Promise<GetResponse<Character[]>> {
    if (!ids?.length) {
      return { results: [], total: 0, pages: 0 };
    }

    const response = await characterApi.get(`/character/${ids?.join(",")}`, {
      params: { ...filters, page },
    });

    return Array.isArray(response?.data)
      ? {
          results: response?.data,
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
    const response = await characterApi.get(`/character/${characterId}`);
    return response?.data;
  },
};
