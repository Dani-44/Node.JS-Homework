import { TrainertModel } from "../models/trainers.models.js";

export class TrainerController {
  // 1. Get all trainers
  static async getAllTrainers(req, res) {
    try {
      const trainers = await TrainertModel.getAllTrainers();

      return res.json(trainers);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }
  }

  // 2. Get all trainers by id
  static async getTrainersById(req, res) {
    try {
      const trainerId = req.params.id;

      const foundTrainer = await TrainertModel.getTrainersById(trainerId);

      return res.json(foundTrainer);
    } catch (error) {
      console.log(error);
      res.status(404).send(error.message);
    }
  }

  // 3. Add trainers
  static async addTrainer(req, res) {
    try {
      const trainerData = req.body;

      const newTrainer = await TrainertModel.addTrainer(trainerData);

      return res.json(newTrainer);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error.message);
    }
  }

  // 4. Update trainer info
  static async updateTrainer(req, res) {
    try {
      const updateData = req.body;
      const trainerId = req.params.id;

      if (updateData.id) throw new Error("Invalid Update");

      const updatedTrainer = await TrainertModel.updateTrainer(
        trainerId,
        updateData
      );

      return res.send(updatedTrainer);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error.message);
    }
  }

  // 5. Delete all trainers
  static async deleteAllTrainers(req, res) {
    try {
      await TrainertModel.deleteAllTrainers();

      return res.sendStatus(200);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }
  }

  // 6. Delete trainer
  static async deleteTrainer(req, res) {
    try {
      const trainerId = req.params.id;

      await TrainertModel.deleteTrainer(trainerId);

      return res.sendStatus(204);
    } catch (error) {
      console.log(error);
      return res.status(404).send(error.message);
    }
  }
}
