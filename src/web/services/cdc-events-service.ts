import { OutboxEventModel } from "../../models/cdc-events";

export const CDCEventService = {
    findAllPendingEvents: async () => {
        return OutboxEventModel.find()
    }
};