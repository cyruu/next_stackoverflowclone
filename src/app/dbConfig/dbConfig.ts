import mongoose from "mongoose";

export async function connect(): Promise<void> {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL is not defined in the environment variables");
    }

    await mongoose.connect(process.env.MONGO_URL);

    const conn = mongoose.connection;

    conn.on("connected", () => {
      console.log("Database connected");
    });

    conn.on("error", (err) => {
      console.error(`Database connection error: ${err}`);
    });

    conn.on("disconnected", () => {
      console.log("Database disconnected");
    });

    console.log("Connecting to the database...");
  } catch (error: any) {
    console.error(`Connection error: ${error.message}`);
  }
}
