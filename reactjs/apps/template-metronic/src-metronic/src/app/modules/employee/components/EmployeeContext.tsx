import type {Dispatch, SetStateAction} from 'react'
import React, {createContext, useContext, useState} from 'react'
import {Employee} from '../modal/EmployeeModal'

export const initEmployee: Employee = {
  id: '',
  parentId: '',
  username: '',
  password: '',
  fullName: '',
  idNumber: '',
  gender: -1,
  dob: '',
  maritalStatus: -1,
  phoneNumber: '',
  email: '',
  address: '',
  relativeName: '',
  relativePhoneNumber: '',
  relationId : undefined,
  relativeEmail: '',
  relativeAddress: '',
  relation: 0,
  academicLevelId: '',
  graduationTypeId: '',
  major: '',
  certificateName: '',
  certificateLevelId: '',
  bankAccount: '',
  bankNumber: '',
  bankName: '',
  bankBranch: '',
  
  // educations: [
  //   {
  //     employeeId: '',
  //     degree: 0,
  //     level: 0,
  //     major: '',
  //   },
  // ],
  // workingInfos: [
  //   {
  //     status: 0,
  //     tenantId: '',
  //     workType: 0,
  //     employeeId: '',
  //   },
  // ],
  // workingContracts: [
  //   {
  //     startTime: '',
  //     endTime: '',
  //     employeeId: '',
  //   },
  // ],
  // positionEmployees: [
  //   {
  //     positionId: '',
  //     employeeId: '',
  //     salaryLevel: 0,
  //     insurance: true,
  //   },
  // ],
  // dateOffs: [
  //   {
  //     dayOfWeek: 0,
  //     halfDay: true,
  //     employeeId: '',
  //   },
  // ],
  // certificateEmployees: [
  //   {
  //     certificate: 0,
  //     certificateLevel: 0,
  //     score: 0,
  //     employeeId: '',
  //   },
  // ],
}
export interface EmployeeContextProps {
  employees: Employee[]
  setEmployees: Dispatch<SetStateAction<Employee[]>>
}

const EmployeeContext = createContext<EmployeeContextProps>({} as EmployeeContextProps)

export const useEmployeeContext = () => useContext<EmployeeContextProps>(EmployeeContext)

const EmployeeProvider: React.FC = ({children}) => {
  const [employees, setEmployees] = useState<Employee[]>()
  const value = {
    employees,
    setEmployees,
  } as EmployeeContextProps

  return <EmployeeContext.Provider value={value}>{children}</EmployeeContext.Provider>
}

export default EmployeeProvider
