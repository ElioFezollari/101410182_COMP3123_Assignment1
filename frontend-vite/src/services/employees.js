
import axios from 'axios'
const baseUrl = "http://localhost:4000/api/v1/emp/employees"
const getEmployees = async() =>{
    const response = await axios.get(baseUrl)
    return response.data
}

const getEmployee = async(id) =>{
    const response = await axios.get(baseUrl+`/${id}`)
    console.log(response.data)
    return response.data
}


const updateEmployee = async(id,updateInfo) =>{
    const response = await axios.put(baseUrl+`/${id}`,updateInfo)
    console.log(response.data)
    return response.data
}

const deleteEmployee = async(id)=>{
    const response = await axios.delete(baseUrl+`/${id}`)
    return response.data
}
const createEmployee = async(createInfo)=>{
    const response = await axios.post(baseUrl,createInfo)
    console.log(response)
    return response.data
}

export default getEmployees
export {getEmployee,updateEmployee,deleteEmployee,createEmployee}