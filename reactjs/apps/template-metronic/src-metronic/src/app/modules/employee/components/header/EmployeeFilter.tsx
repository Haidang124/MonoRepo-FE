import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { KTSVG } from "../../../../../_metronic/helpers";
import { getAllDepartment } from "../../../admin/redux/DepartmentCRUD";
import { getPositions } from "../../../admin/redux/PositionCRUD";
import { StatusOptions } from "../../modal/EmployeeModal";

type Props = {
    status : number | string ,
    positionId : string,
    departmentId : string,
    onChangeState : (value : any , type : string) => void,
    onhandleFilter : () => void,
}

const   EmployeeFilter : React.FC<Props> = ({status, positionId, departmentId, onChangeState, onhandleFilter}) => {
    const [isShow, setIsShow]= useState(false)
    const [departmentOptions,setDepartmentOptions] = useState([{value : '', label : ''}])
    const [positionOptions,setPositionOptions] = useState([{value : '', label : ''}])

    useEffect(() => {
        getAllDepartment().then(res => {
            if(!isEmpty(res.data.data)){
                const options = res.data.data.map((i : any) => ({value : i.id, label : i.name}))
                setDepartmentOptions(options)
            }
        })

        getPositions().then(res => {
            if(!isEmpty(res.data.data)){
                const options = res.data.data.map((i : any) => ({value : i.id, label : i.name}))
                setPositionOptions(options)
            }
        })
    },[])

    const handleChangeState = (value : any, type : string) => {
        onChangeState && onChangeState(value, type)
    }

    const handleFilter= () => {
         onhandleFilter &&onhandleFilter()
         setIsShow(false)
    }
    // useEffect(() => {
        
    // },[])

    return (
      <div className='filter-wrapper'>
        <button
          className='btn btn-light-primary me-3'
          data-kt-menu-trigger='click'
          data-kt-menu-placement='bottom-end'
          onClick={() => setIsShow(!isShow)}
        >
          <KTSVG path='/media/icons/duotune/general/gen031.svg' className='svg-icon-2' />
          Lọc
        </button>
        <div className={isShow ?  'my-1 me-1 filter d-block' : 'my-1 me-1 filter' } data-kt-user-table-filter='form'>
        <div >
          <h3 className='text-dark fw-bolder'>Tùy chọn</h3>
        </div>
        <hr/>
          <div className='d-flex justify-content-between flex-column'>
            <div className='mb-4'>
            <label className='form-label fs-6 fw-bold'>Trạng thái</label>
              <select
                className='form-select form-select-solid fw-bolder'
                data-kt-select2='true'
                data-placeholder='Select option'
                data-allow-clear='true'
                data-hide-search='true'
                data-kt-user-table-filter='status'
                onChange={(e) => handleChangeState(e.target.value, 'status')}
                value={status}
              >
                <option value=''>Chọn trạng thái</option>
                {StatusOptions.map((i) => (
                  <option value={i.value} key={i.value}>
                    {i.label}
                  </option>
                ))}
              </select>
            </div>
            {/* --------- */}
            <div className='mb-4'>
            <label className='form-label fs-6 fw-bold'>Phòng ban</label>
              <select
                className='form-select form-select-solid fw-bolder'
                data-kt-select2='true'
                data-placeholder='Select option'
                data-allow-clear='true'
                data-hide-search='true'
                data-kt-user-table-filter='status'
                onChange={(e) => handleChangeState(e.target.value, 'departmentId')}
                value={departmentId}
              >
                <option value=''>Phòng ban</option>
                {departmentOptions.map((i) => (
                  <option value={i.value} key={i.value}>
                    {i.label}
                  </option>
                ))}
              </select>
            </div>
            {/* ------ */}
            <div className='mb-4'>
            <label className='form-label fs-6 fw-bold'>Chức vụ</label>

              <select
                className='form-select form-select-solid fw-bolder'
                data-kt-select2='true'
                data-placeholder='Select option'
                data-allow-clear='true'
                data-hide-search='true'
                data-kt-user-table-filter='status'
                onChange={(e) => handleChangeState(e.target.value, 'positionId')}
                value={positionId}
              >
                <option value=''>Chức vụ</option>
                {positionOptions.map((i) => (
                  <option value={i.value} key={i.value}>
                    {i.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='d-flex justify-content-end'>
            <button
              type='button'
            //   onClick={filterData}
              className='btn btn-light btn-active-light-primary fw-bold me-2 px-6'
              data-kt-menu-dismiss='true'
              data-kt-user-table-filter='reset'
              onClick={() => setIsShow(false)}
            >
              Reset
            </button>
            <button
              type='button'
            //   onClick={resetData}
              className='btn btn-primary fw-bold px-6'
              data-kt-menu-dismiss='true'
              data-kt-user-table-filter='filter'
              onClick={() => handleFilter()}
            >
              Apply
            </button>
            </div>
        </div>
      </div>
    )
}

export default EmployeeFilter