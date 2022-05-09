import React, {useEffect, useState} from 'react'
import {RoleModel} from '../../../models/RoleModel'
import {useRoleContext} from '../RoleContext'
import {Button} from 'react-bootstrap'
import TreeLoopRole from './TreeLoopRole'
import clsx from 'clsx'

interface Props {
  nodeData: RoleModel
  index: number
  level: number
  handleEditRole: (arg0: RoleModel) => void
  handleDeleteRole: (arg0: RoleModel, arg1: number) => void
}

const TreeNodeRole: React.FC<Props> = ({
  index,
  nodeData,
  level,
  handleEditRole,
  handleDeleteRole,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [_node, _setNode] = useState<RoleModel>(nodeData)
  const {role, setRole} = useRoleContext()

  useEffect(() => _setNode(nodeData), [nodeData])

  const handleClickRole = () => {
    if (nodeData.children) {
      setIsOpen(!isOpen)
    }

    setRole(nodeData)
  }
  return (
    <div className='tree'>
      {isOpen && <div className='tree-line' />}
      <div className='tree-title'>
        <i
          className={clsx(
            'text-warning mr-2 folder-icon fas fs-3',
            isOpen ? 'fa-folder-open' : 'fa-folder'
          )}
        />
        <div
          className={clsx(
            'tree-name no-select flex-grow-1',
            role?.id === _node?.id ? 'active' : ''
          )}
          onClick={handleClickRole}
        >
          {_node.name}
        </div>
        <div className='tree-btn bg-color-highlight'>
          <Button
            size='sm'
            className='btn-icon'
            variant='link'
            onClick={() => handleEditRole(_node)}
          >
            Sửa
          </Button>
          <Button
            size='sm'
            variant='link'
            className='btn-icon text-danger'
            onClick={() => handleDeleteRole(_node, index)}
            disabled={_node.children?.length > 0}
          >
            Xóa
          </Button>
        </div>
      </div>
      {isOpen && (
        <TreeLoopRole key={index} nodes={_node.children} parent={_node} level={level + 1} />
      )}
    </div>
  )
}

export default TreeNodeRole
