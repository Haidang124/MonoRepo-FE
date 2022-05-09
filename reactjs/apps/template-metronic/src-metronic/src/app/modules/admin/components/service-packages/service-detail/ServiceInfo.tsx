import React from 'react'
import {useServiceDetailContext} from './ServiceDetailContext'
import {Button} from 'react-bootstrap'
import {createServicePackage, updateServicePackage} from '../../../redux/ServiceCRUD'
import {useLocation, useNavigate} from 'react-router-dom'
import Decentralization from './Decentralization'
import SVG from 'react-inlinesvg'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'

const ServiceInfo: React.FC = () => {
  const {serviceInfo, setServiceInfo} = useServiceDetailContext()

  const navigate = useNavigate()
  const {state} = useLocation()

  const handleNameChange = (e: any) => {
    const newInfo = {...serviceInfo}
    newInfo.name = e.target.value
    setServiceInfo(newInfo)
  }
  const handleDescriptionChange = (e: any) => {
    const newInfo = {...serviceInfo}
    newInfo.description = e.target.value
    setServiceInfo(newInfo)
  }

  const handleSubmit = () => {
    if (state) {
      updateServicePackage(serviceInfo).then((value) => {
        navigate(-1)
      })
    } else {
      createServicePackage(serviceInfo).then((value) => {
        navigate(-1)
      })
    }
  }

  return (
    <>
      <div className='ServiceInfo'>
        <h2>{state ? 'THÔNG TIN DỊCH VỤ - SẢN PHẨM' : 'TẠO DỊCH VỤ MỚI'}</h2>
        <div className='accordion accordion-icon-toggle' id='kt_accordion_1'>
          <div className='mb-5'>
            <div
              className='accordion-header py-3 d-flex'
              data-bs-toggle='collapse'
              data-bs-target='#kt_accordion_1_item_1'
            >
              <span className='accordion-icon'>
                <span className='svg-icon svg-icon-4'>
                  <SVG src={toAbsoluteUrl('/media/icons/duotune/arrows/arr064.svg')} />
                </span>
              </span>
              <h3 className='fs-4 fw-bold mb-0 ms-4'>Thông tin dịch vụ</h3>
            </div>
            {/* <h3 className='my-4'>Thông tin dịch vụ</h3> */}
            <div id='kt_accordion_1_item_1' className='fs-6 collapse show ps-10'>
              <div className='row mb-3'>
                <label className='col-3 col-form-label required'>Tên dịch vụ</label>
                <div className='col-9'>
                  <input
                    key={'name'}
                    className='form-control'
                    value={serviceInfo != null ? serviceInfo.name : ''}
                    onChange={handleNameChange}
                    placeholder='Tên dịch vụ'
                  />
                </div>
              </div>
              <div className='row mb-3'>
                <label className='col-3 col-form-label'>Mô tả</label>
                <div className='col-9'>
                  <input
                    key={'description'}
                    className='form-control'
                    value={serviceInfo != null ? serviceInfo.description : ''}
                    onChange={handleDescriptionChange}
                    placeholder='Mô tả'
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='mb-5'>
            <div
              className='accordion-header py-3 d-flex'
              data-bs-toggle='collapse'
              data-bs-target='#kt_accordion_1_item_2'
            >
              <span className='accordion-icon'>
                <span className='svg-icon svg-icon-4'>
                  <SVG src={toAbsoluteUrl('/media/icons/duotune/arrows/arr064.svg')} />
                </span>
              </span>
              <h3 className='fs-4 fw-bold mb-0 ms-4'>Phân quyền dịch vụ chính</h3>
            </div>
            <div id='kt_accordion_1_item_2' className='fs-6 collapse show ps-10'></div>
          </div>
        </div>
        {/* <h3 className='my-4'>Phân quyền dịch vụ chính</h3> */}
        <Decentralization />
        <div className='text-end'>
          <Button
            variant='secondary'
            size='sm'
            onClick={() => {
              navigate(-1)
            }}
          >
            Hủy bỏ
          </Button>
          <Button
            size='sm'
            onClick={() => {
              handleSubmit()
            }}
          >
            Hoàn tất
          </Button>
        </div>
      </div>
    </>
  )
}

export default ServiceInfo
