import React, {createContext, useContext, useEffect, useState} from 'react'
import {PositionModel, PositionParams, PositionStatus} from '../../models/PositionModel'
import {getPosition} from '../../redux/PositionCRUD'
import {getAllDepartment} from '../../redux/DepartmentCRUD'
import {DepartmentModel} from '../../models/DepartmentModel'
import {useLocation} from 'react-router-dom'

export interface PositionContextProps {
  departments: DepartmentModel[]
  setDepartments: (department: DepartmentModel[]) => void
  params: any
  setParams: (params: any) => void
  position: PositionModel
  setPosition: (position: PositionModel) => void
  functionIds: string[],
  setFunctionIds: (functionIds: string[]) => void
}

const PositionContext = createContext<PositionContextProps>({} as PositionContextProps)

export const usePositionContext = () => {
  return useContext(PositionContext)
}

export const PositionConsumer = PositionContext.Consumer

export const PositionProvider: React.FC = ({children}) => {
  const [departments, setDepartments] = useState<DepartmentModel[]>([])
  const [params, setParams] = useState<PositionParams>({name: '', page: 1, pageSize: 10})
  const [position, setPosition] = useState<PositionModel>({
    name: '',
    abbreviation: '',
    description: '',
    status: PositionStatus.Activate,
    isManagerDepartment: false,
    isTeacher: false,
    departmentId: '',
    functionIds: [],
    employeeNumber: 0,
  })
  const [functionIds, setFunctionIds] = useState<string[]>([])

  const getData = () => {
    getAllDepartment().then((value) => {
      setDepartments(value.data.data)
    })
  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const state = useLocation().state as string

  useEffect(() => {
    if (state) {
      getPosition(state).then((res) => {
        setPosition(res.data)
        setFunctionIds(res.data.functionIds)
      })
    }
  }, [state])

  const value = {
    departments,
    setDepartments,
    params,
    setParams,
    position,
    setPosition,
    functionIds,
    setFunctionIds,
  }
  return <PositionContext.Provider value={value}>{children}</PositionContext.Provider>
}
