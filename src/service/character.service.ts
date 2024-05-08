import axios from "axios";
import { Character } from "../models/character";

const characterApi = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});

export const CharacterService = {
  async getCharacters(): Promise<Character[]> {
    const response = await characterApi.get("/character");
    return response.data?.results || [];
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
