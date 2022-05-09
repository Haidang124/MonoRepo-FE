import React from 'react'
import edit from '../../../../../assets/images/edit.png'
import remove from '../../../../../assets/images/delete.png'
import {useServicePackageContext} from './ServicePackageContext'
import {packageTypes, ServicePackage, status} from '../../models/ServicePackageModel'
import {Unit} from '../service-unit/UnitContext'
import {useNavigate} from 'react-router-dom'
import Moment from 'moment'
import {Table} from 'react-bootstrap'

const ServicePackageTable: React.FC = () => {
  const {servicePackages, units} = useServicePackageContext()
  const navigate = useNavigate()

  return (
    <>
      <Table striped bordered hover>
        <thead className='text-center' style={{backgroundColor: '#f2f2f2'}}>
          <tr>
            <th style={{width: '5%'}}>STT</th>
            <th style={{width: '23%'}}>GÓI DỊCH VỤ</th>
            <th style={{width: '12%'}}>LOẠI DỊCH VỤ</th>
            <th style={{width: '12%'}}>TRẠNG THÁI</th>
            <th style={{width: '12%'}}>ĐƠN GIÁ</th>
            <th style={{width: '12%'}}>ĐƠN VỊ TÍNH</th>
            <th style={{width: '12%'}}>NGÀY TẠO</th>
            <th style={{width: '12%'}}>TÁC VỤ</th>
          </tr>
        </thead>
        <tbody>
          {servicePackages?.length > 0 ? (
            servicePackages.map((s: ServicePackage, i: number) => (
              <tr key={i}>
                <td className='text-center'>{i + 1}</td>
                <td>{s.name}</td>
                <td className='text-center'>
                  {packageTypes.find((pt) => pt.value === s.packageType)?.label}
                </td>
                <td className='text-center'>{status.find((_s) => _s.value === s.active)?.label}</td>
                <td className='text-center'>{s.price}đ</td>
                <td className='text-center'>
                  {units?.find((u: Unit) => u.id === s.serviceUnitId)
                    ? units?.find((u: Unit) => u.id === s.serviceUnitId).name
                    : ''}
                </td>
                <td className='text-center'>{Moment(s.createDate).format('DD/MM/yyyy')}</td>
                <td className='text-center'>
                  <div>
                    <img
                      src={edit}
                      alt='edit'
                      onClick={() => {
                        navigate(`/admin/serviceDetail`, {state: s.id})
                      }}
                    />
                    <img src={remove} alt='remove' onClick={() => {}} />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr className='text-center'>
              <td colSpan={8}>Chưa có dữ liệu!</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  )
}

export default ServicePackageTable
