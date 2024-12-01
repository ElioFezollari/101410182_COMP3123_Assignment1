import empManagment from '../assets/img/emp-login.jpg'
import {useEffect, useState} from 'react'
import login from '../services/login'
import useAuth from "../hooks/useAuth"
import { Link, useNavigate } from 'react-router-dom'
const Login = () =>{


const [name,setName] = useState("")
const [password,setPassword] = useState("")
const [error,setError] = useState("")
const {auth,setAuth} = useAuth()
const navigate = useNavigate()



useEffect(() => {
    if (auth.accessToken) {
        navigate('/home');
    }
}, [auth.jwt]);

const submitForm = async (e) => {
    e.preventDefault();
    setError("")
    const isEmail = name.includes('@');
    const loginData = isEmail ? { email: name, password } : { username: name, password };
    let res = await login(loginData);
    
    if(res.status >= 200 && res.status < 300){
        setAuth(res.data)
        navigate('/home')
    }
    if (res.status >= 400 && res.status < 500) {
        setError(res.data.message)
    }
}
return(
    <div className="login-wrapper">
        <div className="login">
            <h1>Login</h1>
            <form onSubmit={(e)=>submitForm(e)} className='login-form'>
            <input type='text' placeholder='Name/Email' name='name' id='name' value={name} onChange={(e)=>setName(e.target.value)} ></input>
            <input type='password' placeholder='Password' name='password' id='password' value={password} onChange={(e)=>setPassword(e.target.value)}></input>
            <input type="submit" className='login-btn' value="Log In" />
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            </form>
            {error && (<p className='error'>{error}</p>)}
        </div> 
        <img className='login-img' src={empManagment} alt="" />
    </div>
)
}

export default Login