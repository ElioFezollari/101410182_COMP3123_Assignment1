import axios from 'axios'
const baseUrl = 'http://localhost:4000/api/v1/user/'
const login = async (credentials) => {
  try{
    const response = await axios.post(baseUrl + "login",credentials,{withCredentials:true});
    return response
  }
  catch(error){
    return error.response
  }
}
const logout = async()=>{
  const response = await axios.get(baseUrl+'/logout',{withCredentials:true});
  return response
}

const signup = async (credentials) => {
  try{
    const response = await axios.post(baseUrl + "signup",credentials,{withCredentials:true});
    return response
  }
  catch(error){
    return error.response
  }
}

export default login 
export {logout,signup}