import mongoose from "mongoose";
import { ShiftModel } from "../models/shift";
import { WorkplaceModel } from "../models/workplace";
import { WorkersService } from "../web/services/worker-service";


const seedData = async () => {
  try {
    await mongoose.connect("mongodb://foo:bar@localhost:27017/chaos-beyond-hell?authSource=admin&directConnection=true", {
      serverSelectionTimeoutMS: 5000
    })
    // Seed Workers
    const worker1 = await WorkersService.create({ name: "John Doe" });
    await await WorkersService.create({ name: "Jane Smith" });

    const workplaceFoo = await WorkplaceModel.create({ name: "Office Foo"});
    const workplaceBar = await WorkplaceModel.create({ name: "Office Bar"});
    
    await ShiftModel.create({ workplace: workplaceFoo, worker: worker1, startTime: new Date(), endTime: new Date() });
    await ShiftModel.create({ workplace: workplaceBar, startTime: new Date(), endTime: new Date() });

    console.log("Seed data successfully inserted.");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};

export default seedData;
