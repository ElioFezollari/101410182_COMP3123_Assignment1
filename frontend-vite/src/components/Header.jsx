import { Link, useNavigate } from "react-router-dom"
import { logout } from "../services/login"
import useAuth from "../hooks/useAuth"
const Header = () => {

    const { auth, setAuth } = useAuth()
    const navigator = useNavigate()

    const handleLogout = async () => {
        const response = await logout();
        if (response.status === 200) {
            setAuth({});
            navigator("/")
        }
        return true;
    };
    return (
        <header>
            <h1>Emp Manager</h1>
            <ul>
                {auth.accessToken && <>
                    <li><Link to="/home" >Home</Link></li>
                    <li><button onClick={() => handleLogout()}>Log Out</button></li>
                </>}
                {!auth.accessToken && <>
                    <li><Link to='/'>Login</Link></li>
                    <li><Link to='/signup'>Sign Up</Link></li>
                </>}
            </ul>
        </header>)
}

export default Header