import React from 'react'
import {useRoleContext} from '../RoleContext'
import TreeLoopRole from './TreeLoopRole'

const RoleTree: React.FC = () => {
  const {roles} = useRoleContext()

  return <div className='tree-loop-scroll'>{roles && <TreeLoopRole nodes={roles} level={0}/>}</div>
}

export default RoleTree
