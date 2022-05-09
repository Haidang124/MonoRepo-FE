import axios from 'axios'

const URL_PREFIX = `${process.env.REACT_APP_API_URL}/api/tenants`

export function getAllTenant() {
  return axios.get(`${URL_PREFIX}`)
}
export function getTenantById(id: string) {
  return axios.get(`${URL_PREFIX}/${id}`)
}
export function editTenantById(data: any, id: string) {
  return axios.put(`${URL_PREFIX}/${id}`, data)
}
export function filterTenant(keyword?: string, ServiceStateId?: string) {
  if (ServiceStateId) {
    return axios.get(`${URL_PREFIX}?keyword=${keyword}&ServiceStateId=${ServiceStateId}`)
  }
  return axios.get(`${URL_PREFIX}?keyword=${keyword}`)
}
export function createTenant(data: any) {
  return axios.post(`${URL_PREFIX}`, data)
}
export function deleteTenant(id: string) {
  return axios.delete(`${URL_PREFIX}/${id}`)
}
