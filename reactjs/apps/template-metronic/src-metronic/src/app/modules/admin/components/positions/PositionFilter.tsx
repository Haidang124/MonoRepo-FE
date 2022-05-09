import React from 'react'
import Select from 'react-select'
import {KTSVG} from '../../../../../_metronic/helpers'
import {usePositionContext} from './PositionContext'
import {positionStatuses} from '../../models/PositionModel'

const PositionFilter: React.FC = () => {
  const {params, setParams} = usePositionContext()

  const handleStatusChange = (e: any) => {
    const newParams = {...params}
    if (e) {
      newParams.active = e.value
      setParams(newParams)
    } else {
      newParams.active = null
      setParams(newParams)
    }
  }

  const handleKeyChange = (e: any) => {
    const newParams = {...params}
    if (e !== '') {
      newParams.name = e.target.value
      setParams(newParams)
    } else {
      newParams.name = null
      setParams(newParams)
    }
  }
  return (
    <div className='position-filter align-items-center'>
      <Select
        key={'positionType'}
        className='basic-select'
        isClearable
        placeholder='Trạng thái'
        options={positionStatuses}
        onChange={handleStatusChange}
      />
      <div className='d-flex align-items-center position-relative my-1'>
        <KTSVG
          path='/media/icons/duotune/general/gen021.svg'
          className='svg-icon-1 position-absolute ms-6'
        />
        <input
          type='text'
          data-kt-user-table-filter='search'
          className='form-control w-250px ps-14'
          placeholder='Tìm kiếm'
          onChange={handleKeyChange}
        />
      </div>
    </div>
  )
}

export default PositionFilter
