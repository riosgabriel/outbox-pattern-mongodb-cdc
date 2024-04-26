import { Request, Response } from "express";
import { WorkersService } from "../services/worker-service";

const getWorkers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const workers = await WorkersService.getAll();
    res.json(workers);
  } catch (error) {
    console.error("Error getting workers:", error);
    res.status(500).send("Internal Server Error");
  }
};

const createWorker = async (request: Request, response: Response): Promise<void> => {
  try {
    const workerName = request.body["name"]
    const workers = await WorkersService.create({name: workerName});
    response.json(workers);
  } catch (error) {
    console.error("Error getting workers:", error);
    response.status(500).send("Internal Server Error");
  }
}

export {
  createWorker, getWorkers
};

