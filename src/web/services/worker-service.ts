import { OutboxEventModel } from "../../models/cdc-events";
import { Worker, WorkerModel } from "../../models/worker";

export const WorkersService = {
  getAll: async () => {
    return WorkerModel.find();
  },

  create: async (worker: Worker) => {
    return WorkerModel.createCollection()
      .then(() => WorkerModel.startSession())
      .then((session) => {
        return session.withTransaction(() => {
          const workerCreated = WorkerModel.create(worker)
          OutboxEventModel.create({
            eventType: "WorkerCreated",
            payload: {
              worker
            },
          })
          return workerCreated;
        })
      })
  }
};
