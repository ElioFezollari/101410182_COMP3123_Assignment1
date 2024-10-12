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
    res.status(201).json({message:"Employee created successfully.", employee_id:newEmployee._id})
})

EmpRouter.get('/:eid',async (req,res)=>{
    const eid = req.params.eid
    try{
    const employee = await Employee.findOne({_id: eid})
    if(!employee){
        res.status(404).json({error:"Employee does not exist."})
    }
    res.status(200).json(employee)}
    catch(e){
        res.status(400).json({error:"Please provide a valid id"})
    }
})
EmpRouter.put('/:eid',async (req,res)=>{
    const eid = req.params.eid
    const updateData = req.body
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    try{
    const updatedEmployee = await Employee.findByIdAndUpdate(eid,updateData)


    if (updateData.email && !emailRegex.test(updateData.email)) {
        return res.status(400).json({ error: "Sorry, this email is invalid." });
    }
    if (!updatedEmployee) {
        return res.status(404).json({ error: "Employee not found." });
    }
    return res.status(200).json({ message: "Employee updated successfully.", employee: updatedEmployee })
    }
    catch(e){
        res.status(400).json({error:"There was an error updating the product"})
    }

})
module.exports = EmpRouter