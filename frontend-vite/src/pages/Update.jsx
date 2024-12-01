import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getEmployee, updateEmployee } from "../services/employees"
import useAuth from "../hooks/useAuth"

const Update = () => {
    const { id } = useParams()
    const [email,setEmail] = useState(null)
    const [firstName,setFirstName] = useState(null)
    const [lastName,setLastName] = useState(null)
    const [position,setPosition] = useState(null)
    const [salary,setSalary] = useState(null)
    const [dateOfJoining,setDateOfJoining] = useState(null)
    const [department,setDepartment] = useState(null)
    const [error, setError] = useState()
    const [updateError,setUpdateError] = useState()
    const [success,setSuccess] = useState()
    const [exists,setExists] = useState(false)
    const navigate = useNavigate()

    const {auth,setAuth} = useAuth()
    useEffect(() => {
        if (!auth.accessToken) {
            navigate('/');
        }
    }, [auth.jwt]);


    useEffect(() => {
        getEmployee(id)
            .then((res) => { 
                setEmail(res.employee.email)
                setFirstName(res.employee.first_name)
                setLastName(res.employee.last_name)
                setPosition(res.employee.position)
                setSalary(res.employee.salary)
                setDateOfJoining(res.employee.date_of_joining)
                setDepartment(res.employee.department)
                setExists(true)
            })
            .catch((err) => { setError(err) })
    }, [id])

    const updateUser=async (e)=>{
        e.preventDefault()
        try{
        const response = await updateEmployee(id,{email,first_name:firstName,last_name:lastName,position,salary,date_of_joining:dateOfJoining,department})
        if(response.status = true){
            setUpdateError(null)
            setSuccess("Employee succesfully updated")
        }
        else{
            setSuccess(null)
            setUpdateError(response.message)
        }}
        catch(err){
            setSuccess(null)
            setUpdateError("Please make sure all forms are correct")
        }
    }

    return (
        <div>
            {exists ? <form className="uc-form" onSubmit={(e)=>updateUser(e)}>
                <h1>Update {email}</h1>
                <div className="uc-div">
                <div><label>Email: </label><input type="email" name="email" placeholder="email"  value={email} onChange={(e)=>setEmail(e.target.value)}/></div>
                <div><label>First Name: </label><input type="text" name="firstName" placeholder="First Name" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/></div>
                <div><label>Last Name: </label><input type="text" name="lastName" placeholder="Last Name" value={lastName} onChange={(e)=>setLastName(e.target.value)}/></div>
                <div><label>Position: </label><input type="text" name="position" placeholder="Position" value={position} onChange={(e)=>setPosition(e.target.value)}/></div>
                <div><label>Salary: </label><input type="number" name="salary" placeholder="Salary" value={salary} onChange={(e)=>setSalary(e.target.value)}/></div>
                <div><label>Date Joined: </label><input type="text"  name="dateOfJoining" placeholder="Date Joined" value={dateOfJoining} onChange={(e)=>setDateOfJoining(e.target.value)} /></div>
                <div><label>Department: </label><input type="text" name="department"  placeholder="Department" value={department} onChange={(e)=>setDepartment(e.target.value)}/></div>
                <div><input type="submit" value={"Update"} /></div>
                </div>
                <p className="error" style={{marginTop:0}}>{updateError}</p>
                <p className="success">{success}</p>
                </form> : !error &&  <h2 style={{color:"white"}}>Loading Employee...</h2>}

            {error && <p style={{ fontSize: 50 }} className="error"> Sorry this employee does not exist!</p>}
        </div>
    )
}
export default Update