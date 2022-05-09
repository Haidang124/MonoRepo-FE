import React from 'react'
import {useNavigate} from 'react-router-dom'
import {deleteTenant} from '../../../../redux/TenantCRUD'
import {useTenantContext} from '../../TenantContext'
interface Props {
  index: number
}
const TenantActionsCell: React.FC<Props> = ({index}) => {
  const navigate = useNavigate()
  const tenantContex = useTenantContext()
  const removeTenant = (data: any) => {
    deleteTenant(data.id).then((res) => tenantContex?.getTenants())
  }
  return (
    <div className='table-actions-cell'>
      <i
        className='fas fa-edit mx-3'
        onClick={() => {
          navigate(`/admin/tenantForm`, {
            state: {isCreate: false, data: tenantContex?.tenants[index]},
          })
        }}
      ></i>
      <i className='fa fa-trash' onClick={() => removeTenant(tenantContex?.tenants[index])}></i>
    </div>
  )
}

export default TenantActionsCell
