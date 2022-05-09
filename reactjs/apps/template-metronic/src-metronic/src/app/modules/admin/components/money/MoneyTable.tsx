import React, {useEffect} from 'react'
import {useMoneyContext} from './MoneyContext'

import {useNavigate} from 'react-router-dom'
import {KTCardBody} from '../../../../../_metronic/helpers'
import {deleteMoney, getAllMoneys} from '../../redux/MoneyCRUD'
import {MoneyCategoryOption, MoneyTypeOption} from '../../models/MoneyModel'

const MoneyTable: React.FC = () => {
  const {moneys, setMoneys} = useMoneyContext()
  const navigate = useNavigate()
  useEffect(() => {
    getAllMoneys().then((res) => setMoneys(res.data.data))
  }, [setMoneys])
  function handleDelete(id: string | undefined, name: any) {
      if (window.confirm(`Xóa khoản tiền: ${name}?`)) {
          deleteMoney(id).then(() => {
              getAllMoneys().then((res) => setMoneys(res.data.data))
          })
      }
  }

  return (
    <>
      <KTCardBody className='py-4'>
        <div className='table-responsive'>
          <table
            id='kt_datatable_example'
            className='table table-row-bordered gy-5 text-gray-600 fw-bold'
          >
            <thead>
              <tr className='fw-bold fs-6 text-muted'>
                <th>STT</th>
                <th>Khoản tiền</th>
                <th>Danh mục</th>
                <th>Phân loại</th>
                <th>Mô tả</th>
                <th>Giá</th>
                <th>Đơn vị tính</th>
                <th>Tác vụ</th>
              </tr>
            </thead>
            <tbody className='fs-6'>
              {moneys?.length > 0 ? (
                moneys?.map((element, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{element.name}</td>
                    <td>{MoneyCategoryOption.find((e) => e.value === element.category)?.label}</td>
                    <td>{MoneyTypeOption.find((e) => e.value === element.type)?.label}</td>
                    <td>{element.description}</td>
                    <td>{Intl.NumberFormat('vi-VN').format(element.price ?? 0)}</td>
                    <td>{element.unit}</td>
                    <td>
                      <button
                        className='btn btn-sm btn-clean btn-icon btn-icon-md'
                        onClick={() => {
                          navigate(`/admin/money/moneyForm`, {state: element.id})
                        }}
                      >
                        <i className='fas fa-edit mx-3' />
                      </button>
                      <button
                        className='btn btn-sm btn-clean btn-icon btn-icon-md'
                        onClick={() => handleDelete(element.id, element.name)}
                      >
                        <i className='fa fa-trash' />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8}>
                    <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                      Chưa có dữ liệu !
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </KTCardBody>
    </>
  )
}

export default MoneyTable
