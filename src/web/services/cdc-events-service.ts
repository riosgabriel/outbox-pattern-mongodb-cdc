import { Effect } from "effect";
import { OutboxEventModel } from "../../models/cdc-events";

export const CDCEventService = {
  findAllPendingEvents: () =>
    Effect.tryPromise(() => OutboxEventModel.find({ status: "Pending" })),
};
