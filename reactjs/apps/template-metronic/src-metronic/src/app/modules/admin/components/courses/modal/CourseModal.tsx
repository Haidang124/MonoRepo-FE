import {UserModel} from "../../../../auth/models/UserModel";

enum Status {
  active,
  inactive,
}

export interface Course {
  courseName: string
  subjectId: string
  curriculum: string
  eLearningId?: string
  description?: string
  status: Status
  numberOfSession: string
  numberOfClass: string
  price: number
  createdBy: UserModel
  createdAt: string
  minNumberOfStudent?: string
  maxNumberOfStudent?: string
  id: string
}

export interface Subject {
  id: string
  name: string
  description: string
  createDate: string
  createdBy: UserModel
}
export const StatusOptions = [
  {value: Status.active, label: 'Active'},
  {value: Status.inactive, label: 'Inactive'},
]
