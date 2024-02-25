import mongoose from "mongoose";

let db: typeof mongoose | null = null;
let isConnected = false;

const MONGODB_URI =
  "mongodb+srv://skanda:125678@cluster0.2hvajmp.mongodb.net/todos?retryWrites=true&w=majority&appName=Cluster0";

const dbConnect = async () => {
  if (isConnected) {
    return db;
  }
  try {
    db = await mongoose.connect(MONGODB_URI);
    isConnected = true;
  } catch (error) {
    console.log({ error });
  }
  return db;
};

export default dbConnect;
