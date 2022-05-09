import React, {useEffect, useState} from 'react'
import RoleProvider, {useRoleContext} from './RoleContext'
import {Col, Row} from 'react-bootstrap'
import './style/style.scss'
import RoleModal from './modal/RoleModal'
import FunctionDetail from './function-detail/FunctionDetail'
import RoleTree from './role-tree/RoleTree'
import {FunctionDetailProvider} from './function-detail/FunctionDetailContext'
import {getFunctionsByRole, tickFunction} from '../../redux/RoleCRUD'
import {toast} from 'react-toastify'
import {FunctionRoleData} from '../../models/RoleModel'

const FunctionDetailWrap = () => {
  const {role} = useRoleContext()

  const [listFunctionOfRole, setListFunctionOfRole] = useState<string[]>([])

  useEffect(() => {
    if (role) {
      getFunctionsByRole(role.id).then((res) => {
        setListFunctionOfRole(res.data.data.map((x: FunctionRoleData) => x.functionId))
      })
    }
  }, [role])

  const handleChangeFunctionIds = (functionIds: string[]) => {
    tickFunction(role.id, functionIds)
      .then((res) => {
        toast.success('Chọn chức năng thành công')
        setListFunctionOfRole(functionIds)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      {role && (
        <FunctionDetailProvider
          functionIds={listFunctionOfRole}
          onChangeFunctionIds={handleChangeFunctionIds}
        >
          <FunctionDetail />
        </FunctionDetailProvider>
      )}
    </>
  )
}

const RolePage: React.FC = () => {
  return (
    <RoleProvider>
      <div className='card role-container'>
        <div className='card-body'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bolder fs-3 mb-1'>Cây vai trò</span>
          </h3>
          <Row>
            <Col md={6}>
              <RoleTree />
            </Col>
            <Col md={6}>
              <FunctionDetailWrap />
            </Col>
          </Row>
        </div>
        <RoleModal />
      </div>
    </RoleProvider>
  )
}

export default RolePage
