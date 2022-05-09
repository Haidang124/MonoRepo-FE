import React, {createContext, useContext, useEffect, useState} from 'react'
import {DepartmentModel} from '../../models/DepartmentModel'
import {getAllDepartment} from '../../redux/DepartmentCRUD'

export const initDepartmentValue: DepartmentModel = {
  name: '',
  isTenant: true,
  isRoot: true,
  parentId: '',
  description: '',
  info: {
    serviceStateId: '',
  },
}
export interface IDepartmentContext {
  departments: DepartmentModel[]
  setDepartments: React.Dispatch<React.SetStateAction<DepartmentModel[]>>
  getDepartments: () => void
}
const DepartmentContext = createContext<IDepartmentContext | null>(null)

export const useDepartmentContext = () => {
  return useContext(DepartmentContext)
}

export const DepartmentConsumer = DepartmentContext.Consumer

export const DepartmentProvider: React.FC = ({children}) => {
  const [departments, setDepartments] = useState<DepartmentModel[]>([])
  useEffect(() => {
    getDepartments()
  }, [])
  const getDepartments = () => {
    getAllDepartment().then((res) => {
      setDepartments(res.data.data)
    })
  }
  const value = {
    departments,
    setDepartments,
    getDepartments,
  }
  return <DepartmentContext.Provider value={value}>{children}</DepartmentContext.Provider>
}
