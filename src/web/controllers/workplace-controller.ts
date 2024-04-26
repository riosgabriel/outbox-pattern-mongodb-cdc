import { Request, Response } from "express";
import { WorkplacesService } from "../services/workplace-service";

export const getWorkplaces = async (req: Request, res: Response): Promise<void> => {
  try {
    const workplaces = await WorkplacesService.getAllWorkplaces();
    res.json(workplaces);
  } catch (error) {
    console.error("Error getting workplaces:", error);
    res.status(500).send("Internal Server Error");
  }
};
