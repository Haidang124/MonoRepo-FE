import React, {createContext, useContext, useEffect, useState} from 'react'
import {getAllFunctions, getTreeFunctionDetails} from '../../../redux/FunctionCRUD'
import {FunctionDetailModel} from '../../../models/FunctionDetailModel'

export interface FunctionDetailContextProps {
  functionTreeData: FunctionDetailModel[]
  setFunctionTreeData: (functionDetails: FunctionDetailModel[]) => void
  functions: FunctionDetailModel[]
  setFunctions: (functionDetails: FunctionDetailModel[]) => void
  functionIds: string[]
  onChangeFunctionIds?: (functionIds: string[]) => void
}

export interface FunctionDetailProviderProps {
  functionIds: string[]
  onChangeFunctionIds?: (functionIds: string[]) => void
}

const FunctionDetailContext = createContext<FunctionDetailContextProps>(
  {} as FunctionDetailContextProps
)

export const useFunctionDetailContext = () => {
  return useContext(FunctionDetailContext)
}

export const FunctionDetailConsumer = FunctionDetailContext.Consumer

export const FunctionDetailProvider: React.FC<FunctionDetailProviderProps> = ({
  children,
  functionIds,
  onChangeFunctionIds,
}) => {
  const [functionTreeData, setFunctionTreeData] = useState<FunctionDetailModel[]>([])
  const [functions, setFunctions] = useState<FunctionDetailModel[]>([])

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    getTreeFunctionDetails().then((value) => {
      setFunctionTreeData(value.data)
    })
    getAllFunctions().then((res) => {
      setFunctions(res.data)
    })
  }

  const value = {
    functionTreeData,
    setFunctionTreeData,
    functions,
    setFunctions,
    functionIds,
    onChangeFunctionIds,
  }
  return <FunctionDetailContext.Provider value={value}>{children}</FunctionDetailContext.Provider>
}
