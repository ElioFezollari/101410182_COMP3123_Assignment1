const { body, validationResult, param } = require('express-validator');
const Employee = require('../Models/EmployeeSchema')
const EmpRouter = require('express').Router();

EmpRouter.get('', async (req, res) => {
    const employees = await Employee.find()
    return res.status(200).json(employees)
})

EmpRouter.post('', [
    body('firstName').notEmpty().withMessage('First name is required.'),
    body('lastName').notEmpty().withMessage('Last name is required.'),
    body('email').isEmail().withMessage('Invalid email format.'),
    body('position').notEmpty().withMessage('Position is required.'),
    body('salary').isNumeric().withMessage('Salary must be a number.'),
    body('dateOfJoining').isISO8601().withMessage('Date of joining must be a valid date.'),
    body('department').notEmpty().withMessage('Department is required.')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: false, message: errors.array().map(err => err.msg).join(', ') });
    }
    const { firstName, lastName, email, position, salary, dateOfJoining, department } = req.body;
    const employee = await Employee.findOne({ email });
    if (employee) {
        return res.status(400).json({ status: false, message: "This employee already exists in the system." });
    }
    const newEmployee = new Employee({
        first_name: firstName,
        last_name: lastName,
        email,
        position,
        salary,
        date_of_joining: new Date(dateOfJoining),
        department
    });

    await newEmployee.save();
    res.status(201).json({ status: true, message: "Employee created successfully.", employee_id: newEmployee._id });
});

EmpRouter.get('/:eid', [
    param('eid').isMongoId().withMessage('Invalid employee ID format.')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: false, message: errors.array().map(err => err.msg).join(', ') });
    }
    const eid = req.params.eid;
    try {
        const employee = await Employee.findOne({ _id: eid });
        if (!employee) {
            return res.status(404).json({ status: false, message: "Employee does not exist." });
        }
        res.status(200).json({ status: true, employee });
    } catch (e) {
        res.status(500).json({ status: false, message: "An error occurred while retrieving the employee." });
    }
});
EmpRouter.put('/:eid', [
    param('eid').isMongoId().withMessage('Invalid employee ID format.'),
    body('email').optional().isEmail().withMessage('Invalid email format.'),
    body('firstName').optional().notEmpty().withMessage('First name must not be empty.'),
    body('lastName').optional().notEmpty().withMessage('Last name must not be empty.'),
    body('position').optional().notEmpty().withMessage('Position must not be empty.'),
    body('salary').optional().isNumeric().withMessage('Salary must be a number.'),
    body('dateOfJoining').optional().isISO8601().withMessage('Date of joining must be a valid date.'),
    body('department').optional().notEmpty().withMessage('Department must not be empty.')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: false, message: errors.array().map(err => err.msg).join(', ') });
    }
    const eid = req.params.eid;
    const updateData = req.body;

    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(eid, updateData, { new: true });

        if (!updatedEmployee) {
            return res.status(404).json({ status: false, message: "Employee not found." });
        }

        return res.status(200).json({ status: true, message: "Employee updated successfully.", employee: updatedEmployee });
    } catch (error) {
        return res.status(500).json({ status: false, message: "There was an error updating the employee." });
    }
});
EmpRouter.delete('/:eid', [
    param('eid').isMongoId().withMessage('Invalid employee ID format.')
], async (req, res) => {
    const eid = req.params.eid;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: false, message: errors.array().map(err => err.msg).join(', ') });
    }

    try {
        const deletedEmployee = await Employee.findByIdAndDelete(eid);

        if (!deletedEmployee) {
            return res.status(404).json({ status: false, message: "Employee not found." });
        }

        return res.status(200).json({ status: true, message: "Employee deleted successfully." });
    } catch (error) {
        return res.status(500).json({ status: false, message: "An error occurred while deleting the employee." });
    }
});
module.exports = EmpRouter