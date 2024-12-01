import { useState } from "react"
import { createEmployee } from "../services/employees"

const AddEmployee = () =>{

    const [email,setEmail] = useState(null)
    const [firstName,setFirstName] = useState(null)
    const [lastName,setLastName] = useState(null)
    const [position,setPosition] = useState(null)
    const [salary,setSalary] = useState(null)
    const [dateOfJoining,setDateOfJoining] = useState(null)
    const [department,setDepartment] = useState(null)
    const [updateError,setUpdateError] = useState()
    const [success,setSuccess] = useState()

    const addEmployee=async (e)=>{
        e.preventDefault()
        try {
            const response = await createEmployee({ email, firstName, lastName, position, salary, dateOfJoining, department });
            
            if (response.status === true) {
                setUpdateError(null); 
                setSuccess("Employee successfully created"); 
            } else {
                setSuccess(null); 
                setUpdateError(response.message);
            }
        } catch (error) {
            setSuccess(null); 
            setUpdateError("Please fill all the forms correctly");
        }
    }

    return (
        <div>
            <form className="uc-form" onSubmit={(e)=>addEmployee(e)}>
                <h1>Create employee</h1>
                <div className="uc-div">
                <div><label>Email: </label><input type="email" name="email" placeholder="Email"  value={email} onChange={(e)=>setEmail(e.target.value)}/></div>
                <div><label>First Name: </label><input type="text" name="firstName" placeholder="First Name" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/></div>
                <div><label>Last Name: </label><input type="text" name="lastName" placeholder="Last Name" value={lastName} onChange={(e)=>setLastName(e.target.value)}/></div>
                <div><label>Position: </label><input type="text" name="position" placeholder="Position" value={position} onChange={(e)=>setPosition(e.target.value)}/></div>
                <div><label>Salary: </label><input type="number" name="salary" placeholder="Salary" value={salary} onChange={(e)=>setSalary(e.target.value)}/></div>
                <div><label>Date Joined: </label><input type="text"  name="dateOfJoining" placeholder="Date Joined" value={dateOfJoining} onChange={(e)=>setDateOfJoining(e.target.value)} /></div>
                <div><label>Department: </label><input type="text" name="department"  placeholder="Department" value={department} onChange={(e)=>setDepartment(e.target.value)}/></div>
                <div><input style={{backgroundColor:"#11FF44"}} type="submit" value="Create" /></div>
                </div>
                <p className="error" style={{marginTop:0}}>{updateError}</p>
                <p className="success">{success}</p>
                </form>
        </div>
    )
}

export default AddEmployee