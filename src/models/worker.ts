import { ChangeStreamInsertDocument } from "mongodb";
import { InferSchemaType, Schema, model } from "mongoose";

const schema = new Schema({
  name: { type: String, required: true },
});

type Worker = InferSchemaType<typeof schema>;

const WorkerModel = model("Worker", schema);

const workerChangeStream = WorkerModel.watch<Worker, ChangeStreamInsertDocument<Worker>>();

export {
  Worker,
  WorkerModel,
  workerChangeStream
};
