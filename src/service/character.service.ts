import axios from "axios";
import { Character } from "../models/character";

const characterApi = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});

export const CharacterService = {
  async getCharacters({
    filters,
  }: {
    filters?: Partial<Character>;
  }): Promise<Character[]> {
    const response = await characterApi.get("/character", { params: filters });
    return response.data?.results || [];
  },
  async getFavoriteCharacters({
    ids,
    filters,
  }: { ids?: string[]; filters?: Partial<Character> } = {}): Promise<
    Character[]
  > {
    if (!ids?.length) {
      return [];
    }

    const response = await characterApi.get(`/character/${ids?.join(",")}`, {
      params: filters,
    });

    return Array.isArray(response.data) ? response.data : [response.data];
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
