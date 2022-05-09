import React from 'react'
import {useFunctionContext} from './FunctionContext'
import {
  createFunctionDetails,
  deleteFunctionDetails,
  editFunctionDetails,
} from '../../redux/FunctionCRUD'
import TreeNode from './TreeNodeFunction'
import {Button} from 'react-bootstrap'
import {FunctionDetailModel} from "../../models/FunctionDetailModel";

const TreeLoopFunction: React.FC<{
  nodes: FunctionDetailModel[]
  level: number
  parentId?: string
  parent?: FunctionDetailModel
}> = ({nodes, level, parentId, parent}) => {
  const {functionDetails, setModal, setFunctionDetails, setShowApiEndpointModal, setCurrentFunction} =
    useFunctionContext()

  const handleEdit = (child: FunctionDetailModel) => {
    setModal({
      show: true,
      title: `Sửa chức năng "${child.name}"`,
      data: child?.name,
      edit: true,
      type: child.type,
      onSubmit: (data: any, endPoint: string[], type: string) => {
        const param = {
          id: child.id,
          name: data,
          endpoints: endPoint,
          parentId: parentId,
          type: type ?? '',
          imageIcon: '',
        }
        editFunctionDetails(param).then((res) => {
          child.name = data
          child.type = type
          setFunctionDetails([...functionDetails])
        })
      },
    })
  }

  const handleCreate = (child: FunctionDetailModel[]) => {
    let txtParent = parent ? ` trong "${parent.name}"` : ''
    setModal({
      show: true,
      title: `Thêm chức năng ${txtParent}`,
      data: '',
      endPoint: [],
      type: -1,
      edit: false,
      onSubmit: (data: any, endPoint: string[], type: string) => {
        const param = {
          name: data,
          parentId: parentId,
          endpoints: endPoint,
          type: type ?? '',
          imageIcon: '',
        }
        createFunctionDetails(param).then((res) => {
          if (child) {
            child.push(res.data)
            setFunctionDetails([...functionDetails])
          } else {
            setFunctionDetails([...functionDetails])
          }
        })
      },
    })
  }

  const handleDelete = (child: FunctionDetailModel, index: number) => {
    if (window.confirm(`Xóa chức năng "${child.name}" ?`)) {
      deleteFunctionDetails(child.id).then((res) => {
        nodes.splice(index, 1)
        setFunctionDetails([...functionDetails])
      })
    }
  }

  const handleAddApiEndpoint = () => {
    setCurrentFunction(parent);
    setShowApiEndpointModal(true)
  }

  return (
    <div style={{marginLeft: `${level > 0 ? '40px' : '0'}`}}>
      {nodes?.map((node, i) => (
        <TreeNode
          key={i}
          node={node}
          index={i}
          level={level}
          parentId={node.parentId}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ))}
      <div>
        {level < 3 ? (
          <Button size='sm' variant='link' onClick={() => handleCreate(nodes)}>
            Thêm chức năng
          </Button>
        ) : (
          <Button size='sm' variant='link' onClick={() => handleAddApiEndpoint()}>
            Thêm API Endpoint
          </Button>
        )}
      </div>
    </div>
  )
}

export default TreeLoopFunction
