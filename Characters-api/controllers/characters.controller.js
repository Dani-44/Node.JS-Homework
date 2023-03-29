import { CharactertModel } from "../models/characters.models.js";

export class CharacterController {
  // 1. Get all characters
  static async getAllCharacters(req, res) {
    try {
      const characters = await CharactertModel.getAllCharacters();

      return res.json(characters);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }
  }

  // 2. Get character by id
  static async getCharacterById(req, res) {
    try {
      const characterId = req.params.id;

      const foundCharacter = await CharactertModel.getCharacterById(
        characterId
      );

      return res.json(foundCharacter);
    } catch (error) {
      console.log(error);
      res.status(404).send(error.message);
    }
  }

  // 3. Add characters
  static async addCharacter(req, res) {
    try {
      const characterData = req.body;

      const newCharacter = await CharactertModel.addCharacter(characterData);

      return res.json(newCharacter);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error.message);
    }
  }

  // 4. Update character info
  static async updateCharacter(req, res) {
    try {
      const updateData = req.body;
      const characterId = req.params.id;

      if (updateData.id) throw new Error("Invalid Update");

      const updatedCharacter = await CharactertModel.updateCharacter(
        characterId,
        updateData
      );
      return res.json(updatedCharacter);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error.message);
    }
  }

  // 5. Delete all characters
  static async deleteAllCharacters(req, res) {
    try {
      await CharactertModel.deleteAllCharacters();

      return res.sendStatus(200);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }
  }

  // 6. Delete character
  static async deleteCharacter(req, res) {
    try {
      const characterId = req.params.id;

      await CharactertModel.deleteCharacter(characterId);
      return res.sendStatus(204);
    } catch (error) {
      console.log(error);
      return res.status(404).send(error.message);
    }
  }
}
