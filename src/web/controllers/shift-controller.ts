import { Request, Response } from "express";
import { ShiftsService } from "../services/shift-service";

export const getShifts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const shifts = await ShiftsService.getAllShifts();
    res.json(shifts);
  } catch (error) {
    console.error("Error getting shifts:", error);
    res.status(500).send("Internal Server Error");
  }
};
