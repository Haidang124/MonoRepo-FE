import axios from 'axios'
import {SalaryGradeModel} from '../models/SalaryModel'

const URL_PREFIX = `${process.env.REACT_APP_API_URL}/api/salary-grades`

export function getAllSalaryGrades() {
  return axios.get(`${URL_PREFIX}`)
}
export function getSalaryGradesDetailById(id: string) {
  return axios.get(`${URL_PREFIX}/detail/${id}`)
}
export function createSalaryGrade(data: SalaryGradeModel) {
  return axios.post(`${URL_PREFIX}`, data)
}
export function getSalaryGradesById(id: string) {
  return axios.get(`${URL_PREFIX}/${id}`)
}
export function editSalaryGradesById(data: SalaryGradeModel, id: string) {
  return axios.put(`${URL_PREFIX}/${id}`, data)
}
export function deleteSalaryGrades(id: string) {
  return axios.delete(`${URL_PREFIX}/${id}`)
}
export function getSalaryGradesByPositionId(id: string) {
  return axios.get(`${URL_PREFIX}/position/${id}`)
}
