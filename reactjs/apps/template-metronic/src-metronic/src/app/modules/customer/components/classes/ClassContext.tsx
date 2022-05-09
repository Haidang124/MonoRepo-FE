import React, {createContext, useContext, useEffect, useState} from 'react'
import {ClassModel} from '../../models/ClassModel'
import {getAllClasses} from '../../redux/ClassCRUD'

export const initClassValue: ClassModel = {
  className: '',
  courseId: '',
  foreignTeacherRate: 0,
  numberOfLessons: 0,
  duration: 0,
  note: '',
  startDate: '',
  endDate: '',
  classSchedules: [],
  classStatus: 0,
  trialNumberOfLessons: 0,
  managers: [
    {
      employeeId: '',
      id: '',
    },
  ],
}
export interface IClassContext {
  classes: ClassModel[]
  setClasses: React.Dispatch<React.SetStateAction<ClassModel[]>>
  getClasses: () => void
}
const ClassContext = createContext<IClassContext | null>(null)

export const useClassContext = () => {
  return useContext(ClassContext)
}

export const ClassConsumer = ClassContext.Consumer

export const ClassProvider: React.FC = ({children}) => {
  const [classes, setClasses] = useState<ClassModel[]>([])
  useEffect(() => {
    getClasses()
  }, [])
  const getClasses = () => {
    getAllClasses().then((res) => {
      setClasses(res.data.data)
    })
  }
  const value = {
    classes,
    setClasses,
    getClasses,
  }
  return <ClassContext.Provider value={value}>{children}</ClassContext.Provider>
}
