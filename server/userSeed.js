import mongoose from "mongoose";
import User from "./models/User.js";
import bcrypt from "bcrypt";

const userRegister = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/ems");

    const exists = await User.findOne({ email: "admin@gmail.com" });
    if (exists) {
      console.log("Admin already exists");
      return process.exit();
    }

    const hashPassword = await bcrypt.hash("admin", 10);

    await User.create({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashPassword,
      role: "admin",
    });

    console.log("Admin created successfully!");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

userRegister();
