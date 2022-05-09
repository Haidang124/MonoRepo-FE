import {RoleModel} from '../../../models/RoleModel'
import React, {useEffect, useState} from 'react'
import {useRoleContext} from '../RoleContext'
import {createRole, deleteRole, editRole} from '../../../redux/RoleCRUD'
import {toast} from 'react-toastify'
import TreeNodeRole from './TreeNodeRole'

interface TreeData {
  nodes: RoleModel[]
  parent?: RoleModel
  level: number
}

const TreeLoopRole: React.FC<TreeData> = ({nodes, parent, level}) => {
  const [_nodes, setNodes] = useState<RoleModel[]>(nodes)
  const {setModal, roles, setRoles} = useRoleContext()

  useEffect(() => {
    setNodes(nodes)
  }, [nodes])

  const handleCreateRole = (p?: RoleModel) => {
    setModal({
      show: true,
      title: `Thêm vai trò ${p ? `trong "${p.name}"` : ''}`,
      data: '',
      onSubmit: (name: any) => {
        createRole({
          name: name,
          parentId: p ? p.id : null,
          functionIds: [],
        })
          .then((res) => {
            toast.success('Tạo vai trò thành công')

            if (p) {
              p.children.push(res.data.createdItem)
              setRoles([...roles])
            } else {
              setRoles([...roles, res.data.createdItem])
            }
          })
          .catch((err) => {
            console.log(err)
          })
      },
    })
  }

  const handleEditRole = (child: RoleModel) => {
    setModal({
      show: true,
      title: `Sửa vai trò "${child.name}"`,
      data: child?.name,
      onSubmit: (name: any) => {
        editRole(child.id, {
          name: name,
          functionIds: [],
        })
          .then((res) => {
            child.name = res.data.updatedItem.name
            setRoles([...roles])
            toast.success('Đổi tên thành công')
          })
          .catch((err) => {
            console.log(err)
          })
      },
    })
  }

  const handleDeleteRole = (child: RoleModel, index: number) => {
    if (window.confirm(`Xóa vai trò "${child.name}" ?`)) {
      deleteRole(child.id).then((res) => {
        _nodes.splice(index, 1)
        setRoles([...roles])
      })
    }
  }

  return (
    <div style={{marginLeft: `${level > 0 ? '40px' : '0'}`}}>
      {_nodes?.map((nodeData, i) => (
        <TreeNodeRole
          key={i}
          index={i}
          {...{
            nodeData,
            level,
            handleDeleteRole,
            handleEditRole,
          }}
        />
      ))}
      <div>
        <button className='btn btn-link btn-sm' onClick={() => handleCreateRole(parent)}>
          Thêm vai trò
        </button>
      </div>
    </div>
  )
}
export default TreeLoopRole
