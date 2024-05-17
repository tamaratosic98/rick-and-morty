import { makeAutoObservable } from 'mobx';

import { Character } from './character.types';

class CharacterStore {
  favorites: Array<Character> = [];
  modifiedCharacters: Map<number, Character> = new Map<number, Character>();

  constructor() {
    makeAutoObservable(this);
  }

  setFavorites = (favorites: Array<Character>) => {
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
