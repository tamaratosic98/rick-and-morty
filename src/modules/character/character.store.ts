import { makeAutoObservable } from 'mobx';

import { Character } from './character.types';
import { PAGINATION_INITIAL_STATE } from './character.constants';

class CharacterStore {
  favorites: Array<Character> = [];
  pagination: number = PAGINATION_INITIAL_STATE;
  totalPages: number = 0;
  modifiedCharacters: Map<number, Character> = new Map<number, Character>();

  constructor() {
    makeAutoObservable(this);
  }

  setPagination = (page: number) => {
    this.pagination = page;
  };

  setFavorites = (favorites: Array<Character>) => {
    this.totalPages = Math.ceil(favorites.length / 20);
    this.favorites = favorites;
  };

  setModifiedCharacters = (updatedCharacter: Character) => {
    this.modifiedCharacters.set(updatedCharacter?.id, updatedCharacter);
  };

  isCharacterModified = (character: Character) => {
    return this.modifiedCharacters.has(character?.id);
  };

  getModifiedCharacter = (character: Character) => {
    return this.modifiedCharacters.get(character?.id);
  };

  isFavorite = (id: number) => {
    return this.favorites?.length && this.favorites?.some(char => char.id === id);
  };
}

export const characterStore = new CharacterStore();
