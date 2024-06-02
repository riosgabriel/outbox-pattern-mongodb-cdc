import { Console, Duration, Effect, Schedule } from "effect";
import express from "express";
import mongoose from "mongoose";
import { outboxEventChangeStream } from "./models/cdc-events";
import { getShifts } from "./web/controllers/shift-controller";
import { createWorker, getWorkers } from "./web/controllers/worker-controller";
import { getWorkplaces } from "./web/controllers/workplace-controller";
import { CDCEventService } from "./web/services/cdc-events-service";

const startServer = Effect.suspend(() => {
    const app = express();
    const PORT = 3000;

    app.use(express.json());

    app.get("/shifts", getShifts);
    app.get("/workplaces", getWorkplaces);
    app.get("/workers", getWorkers);
    app.post("/workers", createWorker);
    
    return Effect.try(() => app.listen(PORT))
    .pipe(Effect.tap((_) => Console.log(`Server is running on http://localhost:${PORT}`)))
});

const logAllPendingEvents = Effect.matchEffect(CDCEventService.findAllPendingEvents(), {
  onFailure: (error) =>
    Effect.log(`failure: ${error.message}`),
  onSuccess: (pendingEvents) =>
    Effect.log(`${pendingEvents.length} pending events found`)
})

const repeatLogAllPendingEvents = Effect.repeat(logAllPendingEvents, Schedule.spaced(Duration.millis(1000)))

const connectToMongo = Effect.tryPromise(() => {
  return mongoose.connect(
    "mongodb://foo:bar@localhost:27017/chaos-beyond-hell?authSource=admin&directConnection=true",
    {
      serverSelectionTimeoutMS: 5000,
    }
  );
})

const program = startServer.pipe(
  Effect.andThen(connectToMongo),
  Effect.andThen(repeatLogAllPendingEvents),
  Effect.andThen(() => outboxEventChangeStream.on("change", (change) => {
    if (change.operationType === "insert") {
      console.log("Change Stream Event:", change);
    }
  }))
)

Effect.runPromise(program)