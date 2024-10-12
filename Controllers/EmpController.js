const Employee = require('../Models/EmployeeSchema')
const EmpRouter = require('express').Router();

EmpRouter.get('',async (req,res)=>{
    const employees = await Employee.find()
    return res.status(200).json(employees)
})

EmpRouter.post('',async (req,res)=>{
    const {firstName,lastName,email,position,salary,dateOfJoining,department} = req.body
    if(!firstName || !lastName || !email || !position || !salary || !dateOfJoining || !department){
        return res.status(400).json({error:"Please make sure that you have submitted all of the required employee information"+
            " first name, last name, email, position, salary, date of joining and department "})
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
        return res.status(400).json({error:"Sorry this email is invalid"})
    }

    const employee = await Employee.findOne({email})
    
    if(employee){
        return res.status(400).json({error:"This employee already exists in the system"})
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
    
    await newEmployee.save()
    res.status(201).json({"message":"Employee created successfully.", "employee_id":newEmployee._id})
})


module.exports = EmpRouter