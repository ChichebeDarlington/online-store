import mongoose from "mongoose";

export const DB = async (URI) => {
  return mongoose.connect(URI);
};
