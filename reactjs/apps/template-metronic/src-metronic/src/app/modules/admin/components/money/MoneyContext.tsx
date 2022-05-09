import type {Dispatch, SetStateAction} from 'react'
import React, {createContext, useContext, useState} from 'react'
import {MoneyModal, MoneyModel, MoneyType} from '../../models/MoneyModel'

export interface MoneyContextProps {
  moneys: MoneyModel[]
  setMoneys: Dispatch<SetStateAction<MoneyModel[]>>
  modal: MoneyModal
  setModal: Dispatch<SetStateAction<MoneyModal>>
}

const MoneyContext = createContext<MoneyContextProps>({} as MoneyContextProps)

export const useMoneyContext = () => useContext<MoneyContextProps>(MoneyContext)

const MoneyProvider: React.FC = ({children}) => {
  const [moneys, setMoneys] = useState<MoneyModel[]>()
  const [modal, setModal] = useState<MoneyModal>({
    show: false,
    data: '',
    type: MoneyType.Income,
    title: '',
    onSubmit: () => {},
  })
  const value = {
    moneys,
    setMoneys,
    modal,
    setModal,
  } as MoneyContextProps

  return <MoneyContext.Provider value={value}>{children}</MoneyContext.Provider>
}

export default MoneyProvider
