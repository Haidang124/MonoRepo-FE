import {KTSVG} from '../../../../../_metronic/helpers'
import {useNavigate} from 'react-router-dom'

const ExaminationMarkHeader = () => {
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
          placeholder='Tìm kiếm kì'
          // onChange={(e) => {}}
        />
      </div>
      <div className='d-flex justify-content-end'>
      <button
          type='button'
          className='btn btn-primary mx-3'
        //   onClick={() => {
        //     navigate(`/admin/examinationForm`)
        //   }}
        >
          Lưu lại
        </button>
        <button
          type='button'
          className='btn btn-secondary mx-3'
        //   onClick={() => {
        //     navigate(`/admin/examinationForm`)
        //   }}
        >
          Hủy bỏ 
        </button>
        <button
          type='button'
          className='btn btn-secondary mx-3'
        //   onClick={() => {
        //     navigate(`/admin/examinationForm`)
        //   }}
        >
          Xóa
        </button>
        <button
          type='button'
          className='btn btn-primary mx-3'
        //   onClick={() => {
        //     navigate(`/admin/examinationForm`)
        //   }}
        >
          Thêm học viên
        </button>
      </div>
    </div>
  )
}

export default ExaminationMarkHeader
