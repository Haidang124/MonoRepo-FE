import React from 'react'
import {FunctionDetailProvider} from '../roles/function-detail/FunctionDetailContext'
import FunctionDetail from '../roles/function-detail/FunctionDetail'
import {usePositionContext} from './PositionContext'

const PositionDecentralization: React.FC = () => {
  const {functionIds, setFunctionIds} = usePositionContext()

  const handleChangeFunctionIds = (functionIds: string[]) => {
    setFunctionIds(functionIds)
  }

  return (
    <FunctionDetailProvider functionIds={functionIds} onChangeFunctionIds={handleChangeFunctionIds}>
      <FunctionDetail />
    </FunctionDetailProvider>
  )
}

export default PositionDecentralization
