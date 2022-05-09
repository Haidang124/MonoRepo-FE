import React from 'react'
import Select from 'react-select'
import {packageTypes, status} from '../../models/ServicePackageModel'
import {useServicePackageContext} from './ServicePackageContext'
import {getAllServicePackage} from '../../redux/ServiceCRUD'
import {KTSVG} from '../../../../../_metronic/helpers'

const ServicePackageFilter: React.FC = () => {
  const {params, setParams, setServicePackage} = useServicePackageContext()

  const handleServiceTypeChange = (e: any) => {
    const newParams = {...params}
    if (e) {
      newParams.packageType = e.value
      setParams(newParams)
    } else {
      newParams.packageType = null
      setParams(newParams)
    }
    getAllServicePackage(newParams).then((value) => {
      setServicePackage(value.data.data)
    })
  }
  const handleStatusChange = (e: any) => {
    const newParams = {...params}
    if (e) {
      newParams.active = e.value
      setParams(newParams)
    } else {
      newParams.active = null
      setParams(newParams)
    }
    getAllServicePackage(newParams).then((value) => {
      setServicePackage(value.data.data)
    })
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
    getAllServicePackage(newParams).then((value) => {
      setServicePackage(value.data.data)
    })
  }
  return (
    <div className='service-package-filter align-items-center'>
      <Select
        key={'service'}
        className='basic-select'
        isClearable
        placeholder='Loại dịch vụ'
        options={packageTypes}
        onChange={handleServiceTypeChange}
      />
      <Select
        key={'serviceType'}
        className='basic-select'
        isClearable
        placeholder='Trạng thái'
        options={status}
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

export default ServicePackageFilter
