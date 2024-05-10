import { makeAutoObservable } from "mobx";

import { Character } from "./character.types";

// NOTE - This store is used for storing modified characters only

class CharacterStore {
  modifiedCharacters: Map<number, Character> = new Map<number, Character>();

  constructor() {
    makeAutoObservable(this);
  }

  setModifiedCharacters = (updatedCharacter: Character) => {
    this.modifiedCharacters.set(updatedCharacter.id, updatedCharacter);
  };

  isCharacterModified = (character: Character) => {
    return this.modifiedCharacters.has(character.id);
  };

  getModifiedCharacter = (character: Character) => {
    return this.modifiedCharacters.get(character.id);
  };
}

export const characterStore = new CharacterStore();
