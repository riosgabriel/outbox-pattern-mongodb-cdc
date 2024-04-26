import { WorkplaceModel } from "../../models/workplace";

export const WorkplacesService = {
  getAllWorkplaces: async () => {
    return WorkplaceModel.find();
  },
};
