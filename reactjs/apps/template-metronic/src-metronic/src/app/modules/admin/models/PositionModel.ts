export interface PositionModel {
  id?: string
  name: string
  abbreviation: string
  description: string
  status: PositionStatus
  isManagerDepartment: boolean
  isTeacher: boolean
  departmentId: string
  functionIds: string[]
  employeeNumber: number
}

export interface PositionParams {
  name: string
  page: number
  pageSize: number
}

export enum PositionStatus {
  Activate,
  Pause,
}

export const positionStatuses = [
  {
    value: PositionStatus.Activate,
    label: 'Kích hoạt',
  },
  {
    value: PositionStatus.Pause,
    label: 'Tạm dừng',
  },
]
