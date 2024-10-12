const mongoose = require("mongoose");
const { Schema } = mongoose;

const EmployeeSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    position: { type: String, required: false },
    salary: { type: Number, required: false },
    date_of_joining: { type: Date, required: false },
    department: { type: String, required: false },
}, { timestamps: true });

const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;
