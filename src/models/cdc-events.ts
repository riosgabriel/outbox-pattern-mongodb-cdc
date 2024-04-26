import { ChangeStreamInsertDocument } from "mongodb";
import { InferSchemaType, Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const schema = new Schema({
    eventId: {
        type: String,
        required: true,
        unique: true,
        default: uuidv4,
      },
      eventType: {
        type: String,
        required: true,
      },
      payload: {
        type: Schema.Types.Mixed,
        required: true,
      },
      status: {
        type: String,
        enum: ["Pending", "Processed", "Failed"],
        default: "Pending",
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
});
  

type OutboxEvent = InferSchemaType<typeof schema>;

const OutboxEventModel = model("OutboxEvent", schema);

const outboxEventChangeStream = OutboxEventModel.watch<Worker, ChangeStreamInsertDocument<OutboxEvent>>();

export {
  OutboxEvent,
  OutboxEventModel,
  outboxEventChangeStream
};

