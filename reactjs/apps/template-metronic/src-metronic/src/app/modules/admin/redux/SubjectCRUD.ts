import axios from "axios";
import {Subject} from "../components/courses/modal/CourseModal";

const URL_PREFIX = `${process.env.REACT_APP_API_URL}/api/subjects`;


export function getSubjects() {
    return axios.get(`${URL_PREFIX}/getAllSubject`);
}

export function getSubjectsById(id: any) {
    return axios.get(`${URL_PREFIX}/${id}`);
}

export function editSubjects(subject?: Subject) {
    return axios.put(`${URL_PREFIX}`, {
        id: subject?.id,
        name: subject?.name,
        description: subject?.description
    });
}

export function deleteSubjects(subject: Subject) {
    return axios.delete(`${URL_PREFIX}/${subject.id}`);
}

export async function createSubjects(data: any) {
    return axios.post(`${URL_PREFIX}`, data);
}
