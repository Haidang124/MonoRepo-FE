import {UserModel} from '../../../../auth/models/UserModel'

export interface Classroom {
  name: string
  floor: 0
  description?: string
  classInfo: ClassInfo
  id: string
}

export interface ClassInfo {
  classroomState: 0
  capacity: 0
  ageGroup: 0
  classroomId: string
  createdBy: UserModel
  createDate: string
  id: string
}

enum ClassroomState {
  Unused,
  Repairing,
  Using,
}

enum AgeGroup {
  // Mầm non
  Infant,
  // THPT
  High,
  // Người lớn
  Adult,
  // Tiểu học
  Primary,
  // THCS
  Secondary,
}

export const StateOptions = [
  {value: ClassroomState.Unused, label: 'Không dùng'},
  {value: ClassroomState.Repairing, label: 'Sửa chữa'},
  {value: ClassroomState.Using, label: 'Sử dụng'},
]

export const AgeGroupOptions = [
  {value: AgeGroup.Infant, label: 'Mầm non'},
  {value: AgeGroup.High, label: 'THPT'},
  {value: AgeGroup.Adult, label: 'Người lớn'},
  {value: AgeGroup.Primary, label: 'Tiểu học'},
  {value: AgeGroup.Secondary, label: 'THCS'},
]
