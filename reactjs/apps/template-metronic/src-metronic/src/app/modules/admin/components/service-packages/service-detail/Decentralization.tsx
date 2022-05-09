import React from 'react'
import './style/style.scss'
import {FunctionDetailProvider} from '../../roles/function-detail/FunctionDetailContext'
import FunctionDetail from '../../roles/function-detail/FunctionDetail'
import {useServiceDetailContext} from "./ServiceDetailContext";

const Decentralization: React.FC = () => {
  const {serviceInfo, setServiceInfo} = useServiceDetailContext()

  const handleChangeFunctionIds = (functionIds: string[]) => {
    setServiceInfo({...serviceInfo, functionIds})
  }

  return (
    <FunctionDetailProvider
      functionIds={serviceInfo.functionIds}
      onChangeFunctionIds={handleChangeFunctionIds}
    >
      <FunctionDetail />
    </FunctionDetailProvider>
  )
}

export default Decentralization
