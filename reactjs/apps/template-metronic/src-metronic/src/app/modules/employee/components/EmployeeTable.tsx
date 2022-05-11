import {isEmpty} from 'lodash'
import moment from 'moment'
import React, {useEffect, useState} from 'react'
import {shallowEqual, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {RootState} from '../../../../setup'
import {KTCardBody} from '../../../../_metronic/helpers'
import {getPositions} from '../../admin/redux/PositionCRUD'
import {UserModel} from '../../auth/models/UserModel'
import {StatusOptions} from '../modal/EmployeeModal'
import {deleteEmployee, getEmployees} from '../redux/EmployeeCRUD'
import {useEmployeeContext} from './EmployeeContext'

const EmployeeTable: React.FC = () => {
  const {employees, setEmployees} = useEmployeeContext()
  const user = useSelector<RootState, UserModel>(({auth}) => auth.user as UserModel, shallowEqual)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [positionOptions, setPositionOptions] = useState([{value: '', label: ''}])
  const navigate = useNavigate()

  useEffect(() => {
    getEmployees(user.id).then((res) => setEmployees(res.data.data))
  }, [user, setEmployees])

  useEffect(() => {
    getPositions().then((res) => {
      if (!isEmpty(res.data.data)) {
        const options = res.data.data.map((i: any) => ({value: i.id, label: i.name}))
        setPositionOptions(options)
      }
    })
  }, [])

  const findStatus = (status: number) => {
    return StatusOptions.find((i) => i.value === status)
  }

  const handleDelete = (id: string, fullName: string) => {
    if (window.confirm(`Xóa nhân viên ${fullName}?`)) {
      deleteEmployee(id).then(() => {
        getEmployees(user.id).then((res) => setEmployees(res.data.data))
      })
    }
  }

  return (
    <>
      <KTCardBody className='py-4'>
        <div className='table-responsive'>
          <table id='kt_datatable_example' className='table table-row-bordered gy-5'>
            <thead>
              <tr className='fw-bold fs-6 text-muted'>
                <th>STT</th>
                <th>Họ và tên</th>
                <th>Ngày sinh</th>
                <th>Trạng thái</th>
                <th>Phòng ban</th>
                <th>Điện thoại</th>
                <th>Email</th>
                <th>Hình Thức</th>
                <th>Tác vụ</th>
              </tr>
            </thead>
            <tbody className='fs-6'>
              {employees?.length > 0 ? (
                employees?.map((element: any, index: number) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{element.user?.fullName}</td>
                    <td>{moment(element.user?.dob).format('DD/MM/YYYY')}</td>
                    <td>{findStatus(element.workingInfos[0].status)?.label}</td>
                    <td>Phòng ban</td>
                    <td>{element.user?.phoneNumber}</td>
                    <td>{element.user?.email}</td>
                    <td>
                      {!isEmpty(element.workingInfos)
                        ? element.workingInfos[0].workType
                          ? `Bán thời gian`
                          : `Toàn thời gian `
                        : ''}
                    </td>
                    <td>
                      <div className='center-actions-cell'>
                        <i
                          className='fas fa-edit mx-3'
                          onClick={() => {
                            navigate(`/personnel/employeeForm`, {state: element.id})
                          }}
                        />
                        <i
                          className='fa fa-trash'
                          onClick={() => handleDelete(element.id, element.user?.fullName)}
                        />
                      </div>
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

export default EmployeeTable
