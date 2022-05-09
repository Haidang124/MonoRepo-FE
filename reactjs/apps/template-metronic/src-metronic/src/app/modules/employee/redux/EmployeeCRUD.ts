import axios from 'axios'

const URL_PREFIX = `${process.env.REACT_APP_API_URL}/api/employees`

export async function getEmployees(id: string) {
  return axios.get(`${URL_PREFIX}/all/${id}`)
}

export async function createEmployee(data: any) {
  return axios.post(`${URL_PREFIX}/createEmployee`, data)
}

export async function getEmployeeById(id: unknown) {
  return axios.get(`${URL_PREFIX}/${id}`)
}

export async function updateEmployee(id: unknown, data: any) {
  return axios.put(`${URL_PREFIX}/${id}`, data)
}
export async function deleteEmployee(id: string) {
  return axios.delete(`${URL_PREFIX}/${id}`)
}

export async function getEmployeesByParams(data : any) {
  return axios.get(`${URL_PREFIX}/all/${data.id}`,{params  : data})
}
