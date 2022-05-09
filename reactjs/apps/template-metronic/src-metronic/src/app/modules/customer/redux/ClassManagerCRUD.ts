import axios from 'axios'

const URL_PREFIX = `${process.env.REACT_APP_API_URL}/api/teachers`

export async function getAllManager(userId: string) {
  return axios.post(`${URL_PREFIX}/TeachersOrManagers`, {userId: userId, isTeacher: false})
}
