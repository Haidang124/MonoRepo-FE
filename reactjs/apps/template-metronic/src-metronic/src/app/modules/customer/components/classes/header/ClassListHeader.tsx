import {useNavigate} from 'react-router-dom'
import {KTSVG} from '../../../../../../_metronic/helpers'
import {ClassListFilter} from './ClassListFilter'

const ClassListHeader = () => {
  const navigate = useNavigate()
  return (
    <div className='d-flex align-items-center justify-content-between mx-6 pt-6'>
      <div className='d-flex align-items-center position-relative my-1'>
        <KTSVG
          path='/media/icons/duotune/general/gen021.svg'
          className='svg-icon-1 position-absolute ms-6'
        />
        <input
          type='text'
          data-kt-user-table-filter='search'
          className='form-control form-control-solid w-250px ps-14'
          placeholder='Tìm kiếm lớp học'
          onChange={(e) => {}}
        />
      </div>
      <div className='d-flex justify-content-end'>
        <ClassListFilter />
        <button type='button' className='btn btn-success mx-1' onClick={() => {}}>
          Xuất File
        </button>
        <button
          type='button'
          className='btn btn-secondary mx-1'
          onClick={() => {
            navigate(`/customer/classDetailForm`, {
              state: {data: {type: 'GIÁO VIÊN'}},
            })
          }}
        >
          Đổi Giáo Viên
        </button>
        <button
          type='button'
          className='btn btn-secondary mx-1'
          onClick={() => {
            navigate(`/customer/classDetailForm`, {
              state: {data: {type: 'TRỢ GIẢNG'}},
            })
          }}
        >
          Đổi Trợ Giảng
        </button>
        <button
          type='button'
          className='btn btn-secondary mx-1'
          onClick={() => {
            navigate(`/customer/classDetailForm`, {
              state: {data: {type: 'QUẢN LÝ'}},
            })
          }}
        >
          Đổi Quản Lý
        </button>
        <button
          type='button'
          className='btn btn-primary mx-1'
          onClick={() => {
            navigate(`/customer/classForm`, {state: {isCreate: true, data: {}}})
          }}
        >
          Thêm mới
        </button>
      </div>
    </div>
  )
}

export default ClassListHeader
