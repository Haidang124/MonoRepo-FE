import axios from 'axios'

const URL_PREFIX = `${process.env.REACT_APP_API_URL}/api/functions`

export function getAllFunctions() {
  return axios.get(`${URL_PREFIX}`)
}

export async function getTreeFunctionDetails() {
  return axios.get(`${URL_PREFIX}/tree`)
}

export async function editFunctionDetails(data: any) {
  return axios.put(`${URL_PREFIX}/edit`, data)
}

export async function deleteFunctionDetails(id: any) {
  return axios.delete(`${URL_PREFIX}/delete/${id}`)
}

export async function createFunctionDetails(data: any) {
  return axios.post(`${URL_PREFIX}/create`, data)
}

export async function getAllApiEndpoints() {
  return axios.get(`${URL_PREFIX}/api-endpoints`)
}

export async function updateFunctionApiEndpoints(data: {
  functionId?: string
  apiEndpointIds: string[]
}) {
  return axios.post(`${URL_PREFIX}/api-endpoints`, data)
}
