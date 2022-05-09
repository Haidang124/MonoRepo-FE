import React from 'react'

import {PositionProvider} from './PositionContext'
import './style/style.scss'
import PositionForm from './PositionForm'

const PositionDetail: React.FC = () => {
  return (
    <div className='position-container'>
      <PositionProvider>
        <PositionForm />
      </PositionProvider>
    </div>
  )
}

export default PositionDetail
