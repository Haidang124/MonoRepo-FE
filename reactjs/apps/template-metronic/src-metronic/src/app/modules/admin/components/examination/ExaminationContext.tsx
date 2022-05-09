import { Dispatch, SetStateAction} from 'react'
import React, {createContext, useContext, useState} from 'react'
import { Examination } from '../../models/ExaminatonModel'


export const initExaminations = {
  name: '',
  subjectId: '',
  examType: null,
  classId: '',
  note: '',
  examDate: '',
  examHour: 0,
  examMinute: 0,
  examMethod: null,
  classroomId: '',
  examTeachers: [{employeeId: '', type: -1}],
}

export interface ExaminationContextProps {
    examinations : Examination[],
    setExaminations : Dispatch<SetStateAction<Examination[]>>,
}

const ExaminationContext =  createContext<ExaminationContextProps>({} as ExaminationContextProps)

export const useExaminationContext =() =>  useContext<ExaminationContextProps>(ExaminationContext)

const ExaminationProvider : React.FC = ({children}) => {
    const [examinations, setExaminations] = useState<Examination[]>()
    const value = {
        examinations,
        setExaminations
    } as ExaminationContextProps

    return <ExaminationContext.Provider value={value}>{children}</ExaminationContext.Provider>
}

export default ExaminationProvider