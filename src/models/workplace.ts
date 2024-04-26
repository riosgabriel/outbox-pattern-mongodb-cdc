import { Schema, InferSchemaType, model } from "mongoose";

const schema = new Schema({
  name: { type: String, required: true },
});

type Workplace = InferSchemaType<typeof schema>;

const WorkplaceModel = model("Workplace", schema);

export {
  Workplace,
  WorkplaceModel
}
