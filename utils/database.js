import mongoose from "mongoose";

const db = mongoose
  .connect("mongodb+srv://e-commerce:x96JrlZOB1APqWi6@cluster0.tqr97.mongodb.net/e-commerce")
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log("Database connection failed");
    console.log(error);
  });

export default db;
