import axios from "axios";

const URL_PREFIX = `${process.env.REACT_APP_API_URL}/api/roles`;


export function getAllSubRoles(roleId: string) {
  return axios.get(`${URL_PREFIX}/${roleId}/subRoles`);
}

export function getAllRoles() {
  return axios.get(`${URL_PREFIX}/tree`);
}

export function createRole(role: any) {
  return axios.post(`${URL_PREFIX}`, role);
}

export function editRole(id: string, role: any) {
  return axios.put(`${URL_PREFIX}/${id}`, role);
}

export function deleteRole(id: string) {
  return axios.delete(`${URL_PREFIX}/${id}`);
}

export function tickFunction(id: string, functionIds: string[]) {
  return axios.put(`${URL_PREFIX}/${id}/tickFunction`, functionIds);
}

export function getFunctionsByRole(id: string) {
  return axios.get(`${URL_PREFIX}/${id}/functions`);
}
