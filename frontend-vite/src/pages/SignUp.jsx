import { Link, useNavigate } from "react-router-dom"
import emp from "../assets/img/emp-register.jpg"
import { useState } from "react"
import { signup } from "../services/login"
import useAuth from "../hooks/useAuth"
const SignUp = () => {

    const [name,setName] = useState()
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const [error,setError] = useState("")
    const {auth,setAuth} = useAuth()
    const navigate = useNavigate()

    const handleRegistration = async(e) =>{
        e.preventDefault()
        console.log(name,email,password)
        const res = await signup({username:name,email,password})
        if(res.status >= 200 && res.status < 300){
            setAuth(res.data)
            navigate('/home')
        }
        if (res.status >= 400 && res.status < 500) {
            setError(res.data.message)
            console.log(res.data)
        }
    } 
    return (
        <div className="signup-wrapper">
            <img className='register-img' src={emp} alt="" />
            <div className="signup">
            <h1>Sign Up</h1>
            <form  className='signup-form' onSubmit={(e)=>handleRegistration(e)}>
            <input type='text' value={name} onChange={(e)=>{setName(e.target.value)}}  placeholder='Name' name='name' id='name'  ></input>
            <input type='email'onChange={(e)=>{setEmail(e.target.value)}} value={email}  placeholder='Email' name='email' id='email'  ></input>
            <input type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='Password' name='password' id='password' ></input>
            <input type="submit" className='signup-btn' value="Sign up" />
            <p>Already have an account? <Link to="/">Login</Link></p>
            </form>
            {error && (<p className='error'>{error}</p>)}
            </div>

        </div>
    )
}

export default SignUp