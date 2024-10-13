const mongoose = require("mongoose");
const { Schema } = mongoose;

const EmployeeSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    position: { type: String, required: true },
    salary: { type: Number, required: true },
    date_of_joining: { type: Date, required: true },
    department: { type: String, required: true },
}, { timestamps: true });

const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;
