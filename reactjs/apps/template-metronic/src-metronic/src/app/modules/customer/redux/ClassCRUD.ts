import axios from 'axios'

const URL_PREFIX = `${process.env.REACT_APP_API_URL}/api/classes`

export async function getAllClasses() {
  return axios.get(`${URL_PREFIX}/getClasses`)
}

export async function createClass(data: any) {
  return axios.post(`${URL_PREFIX}/createClass`, data)
}

export async function getClassById(id: string) {
  return axios.get(`${URL_PREFIX}/${id}`)
}
export async function deleteClass(id: string) {
  return axios.delete(`${URL_PREFIX}/${id}`)
}
export async function updateClass(id: string, data: any) {
  return axios.put(`${URL_PREFIX}/${id}`, data)
}
