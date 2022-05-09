import axios from 'axios'

const URL_PREFIX = `${process.env.REACT_APP_API_URL}/api/courses`

export async function getAllCourses(keyword: string) {
  return axios.get(`${URL_PREFIX}?keyword=${keyword}`)
}

export async function createCourse(data: any) {
  return axios.post(`${URL_PREFIX}`, data)
}

export async function getCourseById(id: unknown) {
  return axios.get(`${URL_PREFIX}/getById/${id}`)
}

export async function updateCourse(id: unknown, data: any) {
  return axios.put(`${URL_PREFIX}/${id}`, data)
}

export async function deleteCourse(id: string) {
  return axios.delete(`${URL_PREFIX}/${id}`)
}

export async function getAllSubjects() {
  return axios.get(`${process.env.REACT_APP_API_URL}/api/subjects/getAllSubject`)
}
