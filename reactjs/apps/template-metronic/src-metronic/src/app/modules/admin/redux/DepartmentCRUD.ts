import axios from 'axios'

const URL_PREFIX = `${process.env.REACT_APP_API_URL}/api/departments`
export function getAllDepartment() {
  return axios.get(`${URL_PREFIX}`)
}
export function getDepartmentById(id: string) {
  return axios.get(`${URL_PREFIX}/${id}`)
}
export function editDepartmentById(data: any, id: string) {
  return axios.put(`${URL_PREFIX}/${id}`, data)
}
export function createDepartment(data: any) {
  return axios.post(`${URL_PREFIX}`, data)
}
export function deleteDepartment(id: string) {
  return axios.delete(`${URL_PREFIX}/${id}`)
}
