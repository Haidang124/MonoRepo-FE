import {KTSVG} from '../../../../../_metronic/helpers'
import {useNavigate} from 'react-router-dom'

const MoneyHeader = () => {
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
                    placeholder='Tìm kiếm khóa học'
                    // onChange={(e) => {}}
                />
            </div>
            <div className='d-flex justify-content-end'>
                <button
                    type='button'
                    className='btn btn-primary'
                    onClick={() => {
                        navigate(`/admin/money/moneyForm`)
                    }}
                >
                    <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
                    Thêm mới
                </button>
            </div>
        </div>
    )
}

export default MoneyHeader
