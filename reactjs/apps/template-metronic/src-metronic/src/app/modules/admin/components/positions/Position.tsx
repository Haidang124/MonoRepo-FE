import React from 'react'
import {Link} from 'react-router-dom'
import {PositionProvider} from './PositionContext'
import PositionFilter from './PositionFilter'
import PositionTable from './PositionTable'
import './style/style.scss'

const Position: React.FC = () => {
  return (
    <div className='position-container'>
      <PositionProvider>
        <div className='btn-input'>
          <PositionFilter />
          <div>
            <Link className='btn btn-primary btn-sm' to='/admin/positionDetail'>
              TẠO MỚI
            </Link>
          </div>
        </div>
        <PositionTable />
      </PositionProvider>
    </div>
  )
}

export default Position
