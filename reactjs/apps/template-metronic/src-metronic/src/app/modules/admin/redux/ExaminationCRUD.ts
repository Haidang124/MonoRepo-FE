import axios from "axios";

const URL_PREFIX = `${process.env.REACT_APP_API_URL}/api/exams`

export async function getExaminations() {
    return axios.get(`${URL_PREFIX}/all`)
}

export async function createExaminations(data :  any) {
    return axios.post(`${URL_PREFIX}/create`,data)
}

export async function getExaminationById(id  : unknown) {
    return axios.get(`${URL_PREFIX}/${id}`)
}

export async function updateExamination (id  : unknown, data : any) {
    return axios.put(`${URL_PREFIX}/${id}`,data)
}

export async function deleteExamination(id : unknown) {
    return axios.delete(`${URL_PREFIX}/${id}`)
}

export async function getExaminationsFromParams(data : any) {
    return axios.get(`${URL_PREFIX}/all`,{ params : data})
}
