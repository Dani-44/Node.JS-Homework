import path from "node:path";
import { v4 as uuid } from "uuid";
import { fileURLToPath } from "node:url";
import { DataService } from "./services/data.service.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const trainersPath = path.join(__dirname, "data", "trainers.json");

const saveTrainers = async (trainers) => {
  await DataService.saveJSONFile(trainersPath, trainers);
};

// 1. Get all trainers logic
export const getAllTrainers = async () => {
  const trainers = await DataService.readJSONFile(trainersPath);
  // console.log(trainers);
  return trainers;
};

// 2. Get all trainers by id logic
export const getTrainersById = async (trainerId) => {
  const trainers = await getAllTrainers();
  const foundTrainer = trainers.find((trainer) => trainer.id === trainerId);

  if (!foundTrainer) throw new Error("Trainer not Found");

  return foundTrainer;
};

// 3. Add trainers logic
export const addTrainer = async (
  firstName,
  lastName,
  email,
  timeEmployed,
  coursesFinished
) => {
  const trainers = await getAllTrainers();

  const trainer = {
    id: uuid(),
    firstName,
    lastName,
    email,
    isCurrentlyTeaching: false,
    timeEmployed,
    coursesFinished,
  };

  const updatedTrainers = [...trainers, trainer];

  await saveTrainers(updatedTrainers);
  return trainer;
};

// 4. Update trainer info logic
export const updateTrainer = async (trainerId, updateData) => {
  const trainers = await getAllTrainers();
  const foundTrainer = await getTrainersById(trainerId);

  const updatedTrainer = {
    ...foundTrainer,
    ...updateData,
  };

  const updatedTrainers = trainers.map((trainer) =>
    trainer.id === updatedTrainer.id ? updatedTrainer : trainer
  );

  await saveTrainers(updatedTrainers);

  return updatedTrainer;
};

// 5. Delete trainer logic
export const deleteTrainer = async (trainerId) => {
  const trainers = await getAllTrainers();

  const updatedTrainers = trainers.filter(
    (trainer) => trainer.id !== trainerId
  );

  if (updatedTrainers.length === trainers.length)
    throw new Error("Trainer not found!");

  await saveTrainers(updatedTrainers);
};

// 6. Delete all trainers logic
export const deleteAllTrainers = async () => {
  await saveTrainers([]);
};
