import React, {createContext, useContext, useEffect, useState} from 'react'
import {ApiEndpointModel} from '../../models/ApiEndpointModel'
import {getAllApiEndpoints, getTreeFunctionDetails} from '../../redux/FunctionCRUD'
import {FunctionDetailModel} from '../../models/FunctionDetailModel'

export interface FunctionContextModel {
  functionDetails: FunctionDetailModel[]
  setFunctionDetails: (functionDetails: FunctionDetailModel[]) => void
  modal: any
  setModal: (modal: any) => void
  showApiEndpointModal: boolean
  setShowApiEndpointModal: (showApiEndpointModal: boolean) => void
  apiEndpoints: ApiEndpointModel[]
  setApiEndpoints: (apiEndpoints: ApiEndpointModel[]) => void
  checkApis: string[]
  setCheckApis: (checkApis: string[]) => void
  currentFunction: FunctionDetailModel | undefined
  setCurrentFunction: (currentFunction: FunctionDetailModel | undefined) => void
}

// @ts-ignore
const FunctionContext = createContext<FunctionContextModel>(null)

export const useFunctionContext = () => {
  return useContext(FunctionContext)
}

export const FunctionConsumer = FunctionContext.Consumer

export const FunctionProvider: React.FC = ({children}) => {
  const [functionDetails, setFunctionDetails] = useState<FunctionDetailModel[]>([])
  const [modal, setModal] = useState({
    show: false,
    data: '',
    onSubmit: () => {},
  })
  const [showApiEndpointModal, setShowApiEndpointModal] = useState(false)
  const [apiEndpoints, setApiEndpoints] = useState<ApiEndpointModel[]>([])
  const [checkApis, setCheckApis] = useState<string[]>([])
  const [currentFunction, setCurrentFunction] = useState<FunctionDetailModel>()

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (currentFunction) {
      setCheckApis(currentFunction.apiEndpoints.map((api) => api.id))
    }
  }, [currentFunction])

  const getData = () => {
    getTreeFunctionDetails().then((value) => {
      setFunctionDetails(value.data)
    })
    getAllApiEndpoints().then((value) => {
      setApiEndpoints(value.data)
    })
  }

  const value = {
    functionDetails,
    setFunctionDetails,
    modal,
    setModal,
    showApiEndpointModal,
    setShowApiEndpointModal,
    apiEndpoints,
    setApiEndpoints,
    checkApis,
    setCheckApis,
    currentFunction,
    setCurrentFunction,
  }
  return <FunctionContext.Provider value={value}>{children}</FunctionContext.Provider>
}
