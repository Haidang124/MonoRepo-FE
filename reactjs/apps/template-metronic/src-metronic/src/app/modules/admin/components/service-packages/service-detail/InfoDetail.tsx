import React from 'react'
import {useServiceDetailContext} from './ServiceDetailContext'
import Select from 'react-select'
import {
  packageTypes,
  PackageUserType,
  packageUserTypes,
  status,
} from '../../../models/ServicePackageModel'
import {Link} from "react-router-dom";

const InfoDetail: React.FC = () => {
  const {units, serviceInfo, setServiceInfo} = useServiceDetailContext()
  const _units = units.map((item) => ({value: item.id, label: item.name}))

  const handlePriceChange = (e: any) => {
    const newInfo = {...serviceInfo}
    newInfo.price = e.target.value
    setServiceInfo(newInfo)
  }

  const handleServiceTypeChange = (e: any) => {
    const newInfo = {...serviceInfo}
    newInfo.packageType = e.value
    setServiceInfo(newInfo)
  }
  const handleStatusChange = (e: any) => {
    const newInfo = {...serviceInfo}
    newInfo.active = e.value
    setServiceInfo(newInfo)
  }
  const handleUserTypeChange = (e: PackageUserType) => {
    const newInfo = {...serviceInfo}
    const index = newInfo.userTypes.indexOf(e)
    if (index !== -1) {
      newInfo.userTypes.splice(index, 1)
    } else {
      newInfo.userTypes.push(e)
    }
    setServiceInfo(newInfo)
  }
  const handleUnitChange = (e: any) => {
    const newInfo = {...serviceInfo}
    newInfo.serviceUnitId = e.value
    setServiceInfo(newInfo)
  }

  return (
    <div className='Info-detail'>
      <h3>Thông tin dịch vụ</h3>
      <div className='row mb-3'>
        <label className='col-3 col-form-label required'>Trạng thái</label>
        <div className='col-9'>
          <Select
            key={'serviceType'}
            isSearchable={true}
            options={status}
            value={status.find((t) => t.value === serviceInfo.active)}
            onChange={handleStatusChange}
          />
        </div>
      </div>
      <div className='row mb-3'>
        <label className='col-3 col-form-label required'>Loại dịch vụ</label>
        <div className='col-9'>
          <Select
            key={'service-packages type'}
            isSearchable={true}
            options={packageTypes}
            value={packageTypes.find((t) => t.value === serviceInfo.packageType)}
            onChange={handleServiceTypeChange}
          />
        </div>
      </div>
      <div className='row mb-3'>
        <label className='col-3 col-form-label required'>Loại tài khoản</label>
        <div className='col-9'>
          <div className='align-items-end my-5'>
            {packageUserTypes.map((u, i) => (
              <div key={i} className='d-flex'>
                <div className='w-50'>{u.label}</div>
                <input
                  id={u.label}
                  name={u.label}
                  onChange={() => {
                    handleUserTypeChange(u.value)
                  }}
                  checked={serviceInfo.userTypes.find((s) => s === u.value) != null}
                  type='checkbox'
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='row mb-3'>
        <label className='col-3 col-form-label required'>Đơn giá</label>
        <div className='col-9'>
          <input
            key={'price'}
            className='form-control'
            value={serviceInfo != null ? serviceInfo.price : ''}
            onChange={handlePriceChange}
            placeholder='Đơn giá'
          />
        </div>
      </div>
      <div className='row mb-3'>
        <label className='col-3 col-form-label required'>Đơn vị tính</label>
        <div className='col-7'>
          <Select
            isSearchable={true}
            options={_units}
            value={_units.find((t) => t.value === serviceInfo.serviceUnitId)}
            onChange={handleUnitChange}
          />
        </div>
        <div className="col-2"><Link to="/admin/ServiceUnit" className="btn btn-primary btn-sm">+</Link></div>
      </div>
    </div>
  )
}

export default InfoDetail
