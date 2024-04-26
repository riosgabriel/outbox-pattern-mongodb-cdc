import express from "express";
import mongoose from "mongoose";
import { outboxEventChangeStream } from "./models/cdc-events";
import { getShifts } from "./web/controllers/shift-controller";
import { createWorker, getWorkers } from "./web/controllers/worker-controller";
import { getWorkplaces } from "./web/controllers/workplace-controller";
import { CDCEventService } from "./web/services/cdc-events-service";

const app = express();
const PORT = 3000;

app.use(express.json());
await mongoose.connect("mongodb://foo:bar@localhost:27017/chaos-beyond-hell?authSource=admin&directConnection=true", {
  serverSelectionTimeoutMS: 5000
})

outboxEventChangeStream.on("change", (change) => {
  if (change.operationType === "insert") {
    console.log("Change Stream Event:", change);
  }
});

setInterval(async () => { 
  const pendingEvents = await CDCEventService.findAllPendingEvents()
  console.log(`${pendingEvents.length} pending events found`)
}, 1000);

app.get("/shifts", getShifts);
app.get("/workplaces", getWorkplaces);
app.get("/workers", getWorkers);
app.post("/workers", createWorker)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});