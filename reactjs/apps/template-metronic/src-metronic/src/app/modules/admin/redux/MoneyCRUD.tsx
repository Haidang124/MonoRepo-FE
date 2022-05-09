import axios from 'axios'

const URL_PREFIX = `${process.env.REACT_APP_API_URL}/api/moneys`

export async function getAllMoneys(data?:any) {
    return axios.get(`${URL_PREFIX}/all`,data)
}

export async function createMoney(data: any) {
    return axios.post(`${URL_PREFIX}/create`, data)
}

export async function getMoneyId(id: unknown) {
    return axios.get(`${URL_PREFIX}/${id}`)
}

export async function updateMoney(id: unknown, data: any) {
    return axios.put(`${URL_PREFIX}/${id}`, data)
}

export async function deleteMoney(id: string | undefined) {
    return axios.delete(`${URL_PREFIX}/${id}`)
}
