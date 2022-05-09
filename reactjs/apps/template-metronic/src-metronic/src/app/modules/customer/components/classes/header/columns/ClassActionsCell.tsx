import React from 'react'
import {useNavigate} from 'react-router-dom'
import {deleteClass} from '../../../../redux/ClassCRUD'
import {useClassContext} from '../../ClassContext'
interface Props {
  index: number
}
const ClassActionsCell: React.FC<Props> = ({index}) => {
  const navigate = useNavigate()
  const classContex = useClassContext()
  const removeClasse = (data: any) => {
    deleteClass(data.id).then((res) => classContex?.getClasses())
  }
  return (
    <div className='table-actions-cell'>
      <i
        className='fas fa-edit mx-3'
        onClick={() => {
          navigate(`/customer/classForm`, {
            state: {isCreate: false, data: classContex?.classes[index]},
          })
        }}
      ></i>
      <i className='fa fa-trash' onClick={() => removeClasse(classContex?.classes[index])}></i>
    </div>
  )
}

export default ClassActionsCell
