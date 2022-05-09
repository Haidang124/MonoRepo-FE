import axios from 'axios'

const URL_PREFIX = `${process.env.REACT_APP_API_URL}/api/training-centers`

export function getAllTrainingCenter() {
  return axios.get(`${URL_PREFIX}/all`)
}
export function getTrainingCenterById(id: string) {
  return axios.get(`${URL_PREFIX}/${id}`)
}
export function editTrainingCenterById(data: any, id: string) {
  return axios.put(`${URL_PREFIX}/${id}`, data)
}
export function filterTrainingCenter() {
  return axios.get(`${URL_PREFIX}`)
}
export function createTrainingCenter(data: any) {
  return axios.post(`${URL_PREFIX}`, data)
}
