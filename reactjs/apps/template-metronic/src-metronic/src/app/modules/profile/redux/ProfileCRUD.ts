import axios from 'axios'

const URL_PREFIX = `${process.env.REACT_APP_API_URL}/api/users`

export async function updateProfile(data: any) {
  return axios.put(`${URL_PREFIX}/update-profile`, data)
}

export async function getUserById(id: string) {
  return axios.get(`${URL_PREFIX}/getUserById/${id}`)
}
