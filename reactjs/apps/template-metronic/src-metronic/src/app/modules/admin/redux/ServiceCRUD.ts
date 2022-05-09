import axios from "axios";
import {Unit} from "../components/service-unit/UnitContext";

const URL_PREFIX = `${process.env.REACT_APP_API_URL}/api/service-packages`;


export function getUnits() {
    return axios.get(`${URL_PREFIX}/getAllUnit`);
}

export function editUnits(unit?: Unit) {
    return axios.put(`${URL_PREFIX}/${unit?.id}/serviceUnit`, {
        name: unit?.name,
        description: unit?.description
    });
}

export function deleteUnits(unit: Unit) {
    return axios.delete(`${URL_PREFIX}/${unit.id}/serviceUnit`);
}

export async function createUnits(data: any) {
    return axios.post(`${URL_PREFIX}/create/serviceUnit`, data);
}

export async function createServicePackage(data: any) {
    return axios.post(`${URL_PREFIX}`, data);
}

export async function updateServicePackage(data: any) {
    return axios.put(`${URL_PREFIX}`, data);
}

export async function getAllServicePackage(param: any) {
    return axios.get(`${URL_PREFIX}/all`,{ params: param });
}

export async function getServicePackage(id: any) {
    return axios.get(`${URL_PREFIX}/${id}`);
}