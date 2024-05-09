import axios from "axios";
import { Character } from "../models/character";
import { GetResponse } from "../utils/types";

const characterApi = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
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

    return Array.isArray(response.data)
      ? { results: response.data, total: response.data.length, pages: 1 }
      : { results: [response.data], total: 1, pages: 1 };
  },
  async getCharacter({
    characterId,
  }: {
    characterId: string;
  }): Promise<Character> {
    const response = await characterApi.get(`/character/${characterId}`);
    return response.data;
  },
};
