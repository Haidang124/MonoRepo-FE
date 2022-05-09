import React from 'react'
import {FunctionProvider} from './FunctionContext'
import FunctionTree from './FunctionTree'
import './style/style.scss'

const FunctionPage: React.FC = () => {
  return (
    <div className='card function'>
      <div className='card-body'>
        <h1 className='anchor'>Chức năng</h1>
        <FunctionProvider>
          <FunctionTree />
        </FunctionProvider>
      </div>
    </div>
  )
}

export default FunctionPage
