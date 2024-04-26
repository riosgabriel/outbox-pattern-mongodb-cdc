import { ShiftModel } from "../../models/shift";

export const ShiftsService = {
  getAllShifts: async () => {
    return ShiftModel.find();
  },
};
