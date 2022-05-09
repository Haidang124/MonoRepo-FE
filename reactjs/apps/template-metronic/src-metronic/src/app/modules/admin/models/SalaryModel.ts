export interface SalaryModel {
  minSalary: number
  year: number
  overtimeDayNormal: number
  overtimeDayOff: number
  overtimeDaySpecial: number
  welfareTypes: [
    {
      name: string
      companyPayRate: number
      employeePayRate: number
    }
  ]
  fromDate: string
  toDate: string
  dayOffInWeeks: [
    {
      dayOfWeek: number
      isHalfDay: true
    }
  ]
  dayOffInYears: [
    {
      name: string
      fromDate: string
      toDate: string
    }
  ]
}
export interface SalaryGradeModel {
  positionId: string
  minSalary?: number
  salaryId?: string
  coefficientsSalary: number
  salaryIncrement: number
  workingDays: {
    isActive: boolean
    workingTime: number
    rateBaseOnBasicSalary: number
  }
  workingHours: {
    isActive: boolean
    workingTime: number
    rateBaseOnBasicSalary: number
  }
  teachingHours: {
    isActive: boolean
    workingTime: number
    rateBaseOnBasicSalary: number
  }
  dutyAllowanceRate: number
  otherAllowanceRate: number
}
export const DayOfWeek = [
  {value: 0, label: 'Chủ nhật'},
  {value: 1, label: 'Thứ 2'},
  {value: 2, label: 'Thứ 3'},
  {value: 3, label: 'Thứ 4'},
  {value: 4, label: 'Thứ 5'},
  {value: 5, label: 'Thứ 6'},
  {value: 6, label: 'Thứ 7'},
]
export const WelfareType = [
  {name: 'Social insurance', label: 'Bảo hiểm xã hội'},
  {name: 'Health Insurance', label: 'Bảo hiểm y tế'},
  {name: 'Unemployment insurance', label: 'Bảo hiểm thất nghiệp'},
  {name: 'Union funds', label: 'Kinh phí công đoàn'},
]
