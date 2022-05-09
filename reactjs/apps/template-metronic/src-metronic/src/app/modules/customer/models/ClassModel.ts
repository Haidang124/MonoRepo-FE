export interface ClassModel {
  className: string
  courseId: string
  foreignTeacherRate: number
  numberOfLessons: number
  duration: number
  note: string
  startDate: string
  endDate: string
  classSchedules: Array<any>
  classStatus: number
  trialNumberOfLessons: number
  managers: [
    {
      employeeId: string
      id: string
    }
  ]
}
export interface ClassSchedule {
  dayOfWeek: number
  startTime: string
  classroomId: string
  teachers: []
  tutors: []
}
export const initClassScheduleValue: ClassSchedule = {
  dayOfWeek: 0,
  startTime: '',
  classroomId: '',
  teachers: [],
  tutors: [],
}
export const ClassStatus = [
  {value: 0, label: 'Lớp chờ'},
  {value: 1, label: 'Lớp đang học'},
  {value: 2, label: 'Lớp đã kết thúc'},
  {value: 3, label: 'Lớp hoàn thành'},
  {value: 4, label: 'Lớp đã hủy'},
]
