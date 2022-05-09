import TreeLoopFunction from './TreeLoopFunction'
import {Button} from 'react-bootstrap'
import React, {useState} from 'react'
import clsx from 'clsx'
import {FunctionDetailModel} from '../../models/FunctionDetailModel'

const TreeNodeFunction: React.FC<{
  node: FunctionDetailModel
  index: number
  level: number
  parentId?: string
  handleEdit: (child: FunctionDetailModel) => void
  handleDelete: (child: FunctionDetailModel, index: number) => void
}> = ({node, index, level, parentId, handleDelete, handleEdit}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className='tree'>
        <div className='tree-title'>
          <div className='tree-content'>
            {isOpen && <div className='tree-line' />}
            <div>
              <i
                className={clsx(
                  'text-warning mr-2 folder-icon fas fs-3',
                  isOpen ? 'fa-folder-open' : 'fa-folder'
                )}
              />
            </div>
            <div className='tree-name no-select flex-grow-1' onClick={() => setIsOpen(!isOpen)}>
              {node.name}
            </div>
          </div>
          <div className='tree-btn bg-color-highlight'>
            <Button
              size='sm'
              variant='link'
              className={clsx('btn-icon')}
              onClick={() => handleEdit(node)}
            >
              Sửa
            </Button>
            <Button
              size='sm'
              variant='link'
              className={clsx('btn-icon text-danger')}
              onClick={() => handleDelete(node, index)}
              disabled={node.children?.length > 0}
            >
              Xóa
            </Button>
          </div>
        </div>
        {isOpen && (
          <TreeLoopFunction
            key={index}
            nodes={node.children}
            level={level + 1}
            parentId={node.id}
            parent={node}
          />
        )}
        <div className='ms-5'>
          {isOpen &&
            node.apiEndpoints.length > 0 &&
            node.apiEndpoints.map((a, index) => (
              <div key={index} className='api-endpoint-name'>
                {a.httpMethod} - {a.path}
              </div>
            ))}
        </div>
      </div>
    </>
  )
}
export default TreeNodeFunction
