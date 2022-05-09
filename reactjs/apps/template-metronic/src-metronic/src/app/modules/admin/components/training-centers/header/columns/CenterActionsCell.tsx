import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useCenterContext} from '../../CenterContext'
import '../../style/centerActionsCell.scss'
interface Props {
  index: number
}
const CenterActionsCell: React.FC<Props> = ({index}) => {
  const navigate = useNavigate()
  const centerContex = useCenterContext()
  return (
    <div className='center-actions-cell'>
      <i
        className='fas fa-edit mx-3'
        onClick={() => {
          navigate(`/admin/centerForm`, {
            state: {isCreate: false, data: centerContex?.traningCenters[index]},
          })
        }}
      ></i>
      <i className='fa fa-trash'></i>
    </div>
  )
}

export default CenterActionsCell
