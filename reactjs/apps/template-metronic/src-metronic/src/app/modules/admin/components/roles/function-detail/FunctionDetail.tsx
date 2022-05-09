import React from 'react'
import TreeNodeFunctionDetail from './TreeNodeFunctionDetail'
import {useFunctionDetailContext} from './FunctionDetailContext'
import '../style/style.scss'

const FunctionDetail: React.FC = () => {
  const {functionTreeData} = useFunctionDetailContext()

  return (
    <div className="function-detail">
      <div className='tree-loop-scroll'>
        {functionTreeData.map((node, i) => (
          <TreeNodeFunctionDetail
            key={i}
            functionNode={node}
          />
        ))}
      </div>
    </div>
  )
}

export default FunctionDetail
