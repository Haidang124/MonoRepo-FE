import { Employee } from "../../employee/modal/EmployeeModal"

export interface examTeacher {
    employee? : Employee
    employeeId : string
    type : number
}
export interface Examination {
    id : string
    name : string
    subjectId : string
    examType : number
    classId : string
    note : string
    examDate : string
    examHour : number
    examMinute : number
    examMethod : number
    classroomId : string
    examTeachers: examTeacher[]
}

enum  ExamType {
    Input,
    Class,
    Other
}

export const ExamTypeOptions = [
    {value : ExamType.Input, label : 'Input'},
    {value : ExamType.Class, label : 'Class'},
    {value : ExamType.Other, label : 'Other'},
]

enum ExamMethod {
  Online,
  Offline,
}

export const ExamMethodOptions = [
    {value : ExamMethod.Online, label : 'Trực tuyến'},
    {value : ExamMethod.Offline, label : 'Trực tiếp'},
]

enum ExamTeacherType {
    Look,
    Mark,
}

export const ExamTeacherTypeOptions = [
    {value : ExamTeacherType.Look, }
]