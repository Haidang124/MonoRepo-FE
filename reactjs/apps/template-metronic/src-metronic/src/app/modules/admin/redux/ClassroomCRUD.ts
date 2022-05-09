import axios from 'axios'

const URL_PREFIX = `${process.env.REACT_APP_API_URL}/api/classrooms`

export async function getAllClassrooms(data?: any) {
  return axios.get(`${URL_PREFIX}`, data)
}

export async function createClassroom(data: any) {
  return axios.post(`${URL_PREFIX}`, data)
}

export async function getClassroomById(id: unknown) {
  return axios.get(`${URL_PREFIX}/${id}`)
}

export async function updateClassroom(id: unknown, data: any) {
  return axios.put(`${URL_PREFIX}/${id}`, data)
}

export async function deleteClassroom(id: string) {
  return axios.delete(`${URL_PREFIX}/${id}`)
}
