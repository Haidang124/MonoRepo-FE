import React from 'react'
import {useNavigate} from 'react-router-dom'
import {deleteDepartment} from '../../../../redux/DepartmentCRUD'
import {useDepartmentContext} from '../../DepartmentContext'
interface Props {
  index: number
}
const DepartmentActionsCell: React.FC<Props> = ({index}) => {
  const navigate = useNavigate()
  const departmentContex = useDepartmentContext()
  const removeDepartment = (data: any) => {
    deleteDepartment(data.id).then((res) => departmentContex?.getDepartments())
  }
  return (
    <div className='table-actions-cell'>
      <i
        className='fas fa-edit mx-3'
        onClick={() => {
          navigate(`/admin/departmentForm`, {
            state: {isCreate: false, data: departmentContex?.departments[index]},
          })
        }}
      ></i>
      <i
        className='fa fa-trash'
        onClick={() => removeDepartment(departmentContex?.departments[index])}
      ></i>
    </div>
  )
}

export default DepartmentActionsCell
