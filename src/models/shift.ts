import { InferSchemaType, Schema, model } from "mongoose";

const schema = new Schema({
  worker: { type: Schema.Types.ObjectId, ref: "Worker" },
  workplace: { type: Schema.Types.ObjectId, ref: "Workplace", required: true},
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
});

type Shift = InferSchemaType<typeof schema>;

const ShiftModel = model("Shift", schema);

export {
  Shift,
  ShiftModel
};

