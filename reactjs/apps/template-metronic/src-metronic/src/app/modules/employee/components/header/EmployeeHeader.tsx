import {useNavigate} from 'react-router-dom'
import {KTSVG} from '../../../../../_metronic/helpers'
import EmployeeFilter from './EmployeeFilter'
import './../../style/style.scss'
import {useEmployeeContext} from '../EmployeeContext'
import {useState} from 'react'
import {getEmployeesByParams} from '../../redux/EmployeeCRUD'
import {UserModel} from '../../../auth/models/UserModel'
import {RootState} from '../../../../../setup'
import {shallowEqual, useSelector} from 'react-redux'

const EmployeeHeader = () => {
  const {setEmployees} = useEmployeeContext()
  const user = useSelector<RootState, UserModel>(({auth}) => auth.user as UserModel, shallowEqual)
  const [status, setStatus] = useState<number | string>('')
  const [positionId, setPositionId] = useState('')
  const [departmentId, setDepartmentId] = useState('')
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()

  const handleChangeState = (value: any, type: string) => {
    if (type === 'status') {
      setStatus(value)
    } else if (type === 'positionId') {
      setPositionId(value)
    } else {
      setDepartmentId(value)
    }
  }

  const handleKeyDown = (e :  any) => {
   
        handleSearchEmployee()
    
  }

  const handleSearchEmployee = () => {
    const data = {
      id : user.id, status, positionId, departmentId, keyword
    }
    getEmployeesByParams(data).then((res) =>
      setEmployees(res.data.data)
    )
  }

  return (
    <div className='d-flex align-items-center justify-content-between mx-6 pt-6'>
      <div className='d-flex align-items-center'>
        
        <div className='d-flex align-items-center position-relative my-1'>
          <input
            type='text'
            data-kt-user-table-filter='search'
            className='form-control form-control-solid w-250px ps-14'
            placeholder='Tìm kiếm nhân viên'
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value)
            }}
            onKeyUp={(e) => handleKeyDown(e)}
          />
        </div>
        <div className='d-flex search' onClick={() => handleSearchEmployee()}>
          <i className='fas fa-search'></i>
        </div>
      </div>
      <div className='d-flex justify-content-end'>
        {/*<CenterListFilter />*/}
        <EmployeeFilter
          status={status}
          positionId={positionId}
          departmentId={departmentId}
          onChangeState={handleChangeState}
          onhandleFilter={handleSearchEmployee}
        />
        <button
          type='button'
          className='btn btn-primary'
          onClick={() => {
            navigate(`/personnel/employeeForm`)
          }}
        >
          <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
          Thêm mới
        </button>
      </div>
    </div>
  )
}

export default EmployeeHeader
