import path from "node:path";
import { v4 as uuid } from "uuid";
import { fileURLToPath } from "node:url";
import { DataService } from "../services/data.service.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const trainersPath = path.join(__dirname, "..", "data", "trainers.json");

export class TrainertModel {
  // Save trainers
  static async saveTrainers(trainers) {
    await DataService.saveJSONFile(trainersPath, trainers);
  }

  // 1. Get all trainers logic
  static async getAllTrainers() {
    const trainers = await DataService.readJSONFile(trainersPath);

    return trainers;
  }

  // 2. Get all trainers by id logic
  static async getTrainersById(trainerId) {
    const trainers = await this.getAllTrainers();

    const foundTrainer = trainers.find((trainer) => trainer.id === trainerId);

    if (!foundTrainer) throw new Error("Task not Found");

    return foundTrainer;
  }

  // 3. Add trainers logic
  static async addTrainer(trainerData) {
    const trainers = await this.getAllTrainers();

    const emailExists = trainers.some(
      (trainer) => trainer.email === trainerData.email
    );

    if (emailExists) throw new Error("Email already exists!");

    const trainer = {
      id: uuid(),
      ...trainerData,
    };

    const updatedTrainers = [...trainers, trainer];

    await this.saveTrainers(updatedTrainers);
    return trainer;
  }

  // 4. Update trainer info logic
  static async updateTrainer(trainerId, updateData) {
    const trainers = await this.getAllTrainers();
    const foundTrainer = await this.getTrainersById(trainerId);

    const updatedTrainer = {
      ...foundTrainer,
      ...updateData,
    };

    const updatedTrainers = trainers.map((trainer) =>
      trainer.id === updatedTrainer.id ? updatedTrainer : trainer
    );

    await this.saveTrainers(updatedTrainers);

    return updatedTrainer;
  }

  // 5. Delete all trainers logic
  static async deleteAllTrainers() {
    await this.saveTrainers([]);
  }

  // 6. Delete trainer logic
  static async deleteTrainer(trainerId) {
    const trainers = await this.getAllTrainers();

    const updatedTrainers = trainers.filter(
      (trainer) => trainer.id !== trainerId
    );

    if (updatedTrainers.length === trainers.length)
      throw new Error("Trainer not found!");

    await this.saveTrainers(updatedTrainers);
  }
}
