import dotenv from "dotenv";
import { connectDB } from "./configs/conn.js";
import app from "./app.js";
import { createAdmin } from "./seed/createAdmin.js";

dotenv.config({ quiet: true });

const Port = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  createAdmin();

  app.listen(Port, () => console.log(`Server running on port ${Port}`));
};

startServer();
