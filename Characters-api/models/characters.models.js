import { DataService } from "../services/data.service.js";
import { v4 as uuid } from "uuid";
import { pathBuilder } from "../utils/utils.js";

const charactersPath = pathBuilder(["..", "data", "starwars.json"]);

export class CharactertModel {
  // Save character
  static async saveCharacter(character) {
    await DataService.saveJSONFile(charactersPath, character);
  }

  // 1. Get all characters logic
  static async getAllCharacters() {
    const characters = await DataService.readJSONFile(charactersPath);

    return characters;
  }

  // 2. Get character by id logic
  static async getCharacterById(characterId) {
    const characters = await this.getAllCharacters();

    const foundCharacter = characters.find(
      (character) => character.id === characterId
    );
    // console.log(foundCharacter);

    if (!foundCharacter) throw new Error("Character not found!");

    return foundCharacter;
  }

  // 3. Add character logic
  static async addCharacter(characterData) {
    const characters = await this.getAllCharacters();

    const emailExists = characters.some(
      (character) => character.email === characterData.email
    );

    if (emailExists) throw new Error("Email already exists!");

    const character = {
      id: uuid(),
      ...characterData,
    };

    const updatedCharacters = [...characters, character];

    await this.saveCharacter(updatedCharacters);
    return character;
  }

  // 4. Update character info logic
  static async updateCharacter(characterId, updateData) {
    const characters = await this.getAllCharacters();
    const foundCharacter = await this.getCharacterById(characterId);

    const updatedCharacter = {
      ...foundCharacter,
      ...updateData,
    };

    const updatedCharacters = characters.map((character) =>
      character.id === updatedCharacter.id ? updatedCharacter : character
    );

    await this.saveCharacter(updatedCharacters);

    return updatedCharacter;
  }

  // 5. Delete all characters logic
  static async deleteAllCharacters() {
    await this.saveCharacter([]);
  }

  // 6. Delete character logic
  static async deleteCharacter(characterId) {
    const characters = await this.getAllCharacters();

    const updatedCharacters = characters.filter(
      (character) => character.id !== characterId
    );

    if (updatedCharacters.length === characters.length)
      throw new Error("Character not found!");

    await this.saveCharacter(updatedCharacters);
  }
}
