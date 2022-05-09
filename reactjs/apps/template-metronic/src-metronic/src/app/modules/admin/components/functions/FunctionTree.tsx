import React from 'react'
import TreeLoopFunction from './TreeLoopFunction'
import FunctionModal from './FunctionModal'
import ApiEndpointModal from './ApiEndpointModal'
import {useFunctionContext} from './FunctionContext'

const FunctionTree: React.FC = () => {
  const {functionDetails} = useFunctionContext()

  return (
    <>
      <div>
        <TreeLoopFunction nodes={functionDetails} level={0} />
      </div>
      <FunctionModal />
      <ApiEndpointModal />
    </>
  )
}

export default FunctionTree
