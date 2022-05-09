import React, {createContext, useContext, useEffect, useState} from 'react'
import {getAllTrainingCenter} from '../../redux/TrainingCenterCRUD'
import {Center} from '../../models/TrainingCenterModel'
export const initCenterValue: Center = {
  name: '',
  abbreviation: '',
  address: '',
  centerType: {id: '', name: ''},
  companyName: '',
  district: {id: '', name: '', provinceId: ''},
  email: '',
  id: '',
  phoneNumber: '',
  taxCode: '',
}
export interface ICenterContext {
  traningCenters: Center[]
  setTraningCenters: React.Dispatch<React.SetStateAction<Center[]>>
}
const CenterContext = createContext<ICenterContext | null>(null)

export const useCenterContext = () => {
  return useContext(CenterContext)
}

export const CenterConsumer = CenterContext.Consumer

export const CenterProvider: React.FC = ({children}) => {
  const [traningCenters, setTraningCenters] = useState<Center[]>([])
  useEffect(() => {
    getAllTrainingCenter().then((res) => {
      setTraningCenters(res.data.data)
    })
  }, [])
  const value = {
    traningCenters,
    setTraningCenters,
  }
  return <CenterContext.Provider value={value}>{children}</CenterContext.Provider>
}
