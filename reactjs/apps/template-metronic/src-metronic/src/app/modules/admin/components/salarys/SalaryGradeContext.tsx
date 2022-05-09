import React, {createContext, useContext, useEffect, useState} from 'react'
import {SalaryGradeModel, SalaryModel} from '../../models/SalaryModel'
import { getAllSalaryGrades } from '../../redux/SalaryGradesCRUD'
// import {getAllSalaryGrade} from '../../redux/SalaryGradeCRUD'

export const initSalaryGradeValue: SalaryGradeModel = {
  positionId: '',
  coefficientsSalary: 0,
  salaryIncrement: 0,
  workingDays: {
    isActive: true,
    workingTime: 0,
    rateBaseOnBasicSalary: 0,
  },
  workingHours: {
    isActive: true,
    workingTime: 0,
    rateBaseOnBasicSalary: 0,
  },
  teachingHours: {
    isActive: true,
    workingTime: 0,
    rateBaseOnBasicSalary: 0,
  },
  dutyAllowanceRate: 0,
  otherAllowanceRate: 0,
}
export const initSalary: SalaryModel = {
  minSalary: 0,
  year: 0,
  overtimeDayNormal: 0,
  overtimeDayOff: 0,
  overtimeDaySpecial: 0,
  welfareTypes: [
    {
      name: '',
      companyPayRate: 0,
      employeePayRate: 0,
    },
  ],
  fromDate: '',
  toDate: '',
  dayOffInWeeks: [
    {
      dayOfWeek: 0,
      isHalfDay: true,
    },
  ],
  dayOffInYears: [
    {
      name: '',
      fromDate: '',
      toDate: '',
    },
  ],
}
export interface ISalaryGradeContext {
  salaryGrades: SalaryGradeModel[]
  setSalaryGrades: React.Dispatch<React.SetStateAction<SalaryGradeModel[]>>
  getSalaryGrades: () => void
}
const SalaryGradeContext = createContext<ISalaryGradeContext | null>(null)

export const useSalaryGradeContext = () => {
  return useContext(SalaryGradeContext)
}

export const SalaryGradeConsumer = SalaryGradeContext.Consumer

export const SalaryGradeProvider: React.FC = ({children}) => {
  const [salaryGrades, setSalaryGrades] = useState<SalaryGradeModel[]>([])
  useEffect(() => {
    getSalaryGrades()
  }, [])
  const getSalaryGrades = () => {
    getAllSalaryGrades().then((res: any) => {
      setSalaryGrades(res.data.data)
    })
  }
  const value = {
    salaryGrades,
    setSalaryGrades,
    getSalaryGrades,
  }
  return <SalaryGradeContext.Provider value={value}>{children}</SalaryGradeContext.Provider>
}
