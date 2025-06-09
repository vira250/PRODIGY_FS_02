import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    dep_name: { type: String, required: true },
    description: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
})

const Department = mongoose.model('Department', departmentSchema);

export default Department;