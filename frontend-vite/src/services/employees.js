
import axios from 'axios'
const baseUrl = "http://localhost:4000/api/v1/emp/employees"
const getEmployees = async() =>{
    const response = await axios.get(baseUrl)
    console.log(response)
    return response.data
}

export default getEmployees