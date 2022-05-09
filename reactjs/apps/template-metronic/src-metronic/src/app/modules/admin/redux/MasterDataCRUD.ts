import axios from 'axios'

const URL_PREFIX = `${process.env.REACT_APP_API_URL}/api/master-data`

export function getProvinces() {
  return axios.get(`${URL_PREFIX}/provinces`)
}
export function getDistrictsByProvinceId(provinceId: string) {
  return axios.get(`${URL_PREFIX}/provinces/${provinceId}/districts`)
}
export function getCentertypes() {
  return axios.get(`${URL_PREFIX}/center-types`)
}
export function getSubjects() {
  return axios.get(`${URL_PREFIX}/subjects`)
}
export function getServiceStates() {
  return axios.get(`${URL_PREFIX}/service-states`)
}
export function getSaleChannels() {
  return axios.get(`${URL_PREFIX}/sale-channels`)
}
export function getUserTypes() {
  return axios.get(`${URL_PREFIX}/user-types`)
}
export function getManagerPositions() {
  return axios.get(`${URL_PREFIX}/manager-positions`)
}

export function getMasterDataBanks() {
  return axios.get(`${URL_PREFIX}/banks`)
}

export function getMasterSubjects() {
  return axios.get(`${URL_PREFIX}/subjects`)
}
