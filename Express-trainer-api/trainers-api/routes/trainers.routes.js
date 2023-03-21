import { Router } from "express";
import {
  addTrainer,
  getAllTrainers,
  getTrainersById,
  updateTrainer,
  deleteTrainer,
  deleteAllTrainers,
} from "../trainers.js";

export const trainerRouter = Router();

// 1. Get all trainers
trainerRouter.get("/", async (req, res) => {
  try {
    const trainers = await getAllTrainers();
    return res.json(trainers);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

// 2. Get all trainers by id
trainerRouter.get("/:id", async (req, res) => {
  try {
    const trainerId = req.params.id;
    const foundTrainer = await getTrainersById(trainerId);
    return res.json(foundTrainer);
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  }
});

// // 3. Add trainers
trainerRouter.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, timeEmployed, coursesFinished } = req.body;

    if (!firstName || !lastName || !email || !timeEmployed || !coursesFinished)
      throw new Error("Invalid trainer data");

    const newTrainer = await addTrainer(
      firstName,
      lastName,
      email,
      timeEmployed,
      coursesFinished
    );
    return res.json(newTrainer);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
});

// 4. Update trainer info
trainerRouter.patch("/:id", async (req, res) => {
  try {
    const updateData = req.body;
    const trainerId = req.params.id;

    if (updateData.id) throw new Error("Invalid Update");

    const updatedTrainer = await updateTrainer(trainerId, updateData);
    return res.send(updatedTrainer);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
});

// 5. Delete all trainers
trainerRouter.delete("/all", async (req, res) => {
  try {
    await deleteAllTrainers();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

// 6. Delete trainer
trainerRouter.delete("/:id", async (req, res) => {
  try {
    const trainerId = req.params.id;

    await deleteTrainer(trainerId);
    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(404).send(error.message);
  }
});
