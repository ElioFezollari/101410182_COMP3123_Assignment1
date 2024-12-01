import axios from 'axios'

const baseUrl = "http://localhost:4000/api/v1/user/refresh"
const refreshToken = async() =>{
    const response = await axios.get(baseUrl,{
        withCredentials:true,
    })
    return response.data
}

export default refreshToken