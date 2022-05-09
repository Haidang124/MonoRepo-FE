import axios from 'axios'
import {SalaryModel} from '../models/SalaryModel'

const URL_PREFIX = `${process.env.REACT_APP_API_URL}/api/salaries`

export function getSalaryByYear(year?: number) {
  if (year) {
    return axios.get(`${URL_PREFIX}?year=${year}`)
  }
  return axios.get(`${URL_PREFIX}`)
}
export function createSalary(data: SalaryModel) {
  return axios.post(`${URL_PREFIX}`, data)
}
