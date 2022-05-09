import axios from 'axios'
import {PositionModel, PositionParams} from "../models/PositionModel";

const URL_PREFIX = `${process.env.REACT_APP_API_URL}/api/positions`

export function findPositions(params: PositionParams) {
  return axios.get(`${URL_PREFIX}/find`, { params: params })
}

export function createPosition(data: PositionModel) {
  return axios.post(`${URL_PREFIX}`, data)
}

export function getPosition(id: string) {
  return axios.get(`${URL_PREFIX}/${id}`)
}

export function updatePosition(id: string, data: PositionModel) {
  return axios.put(`${URL_PREFIX}/${id}`, data)
}

export function deletePosition(id: string) {
  return axios.delete(`${URL_PREFIX}/${id}`)
}

export async function getPositions() {
  return axios.get(`${URL_PREFIX}/getAll`)
}

