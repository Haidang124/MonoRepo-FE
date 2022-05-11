import moment from "moment";
import React, { useEffect, useState } from "react";
import { KTSVG } from "../../../../../../_metronic/helpers";
import { ExamMethodOptions, ExamTypeOptions } from "../../../models/ExaminatonModel";
import { getExaminationsFromParams } from "../../../redux/ExaminationCRUD";
import { getMasterSubjects } from "../../../redux/MasterDataCRUD";
import { useExaminationContext } from "../ExaminationContext";


const   ExaminationFilter : React.FC = () => {
  const {setExaminations} = useExaminationContext()
    const [isShow, setIsShow]= useState(false)
    const[subject, setSubject] = useState('')
    const[examType, setExamType] = useState<number | string>()
    const[examMethod, setExamMethod] = useState<number | string>('')
    const[examDate, setExamDate] = useState<string>('')


    const [subjectsOptions, setSubjectsOptions] = useState([{value: '', label: ''}])

    // const [examType, setexamType] = useState([{value: '', label: ''}])


    useEffect(() => {
      getMasterSubjects().then((res) => {
        const list = res.data.data.map((item: any) => ({value: item.id, label: item.name}))
        setSubjectsOptions(list)
      })
    }, [])

    const handleFilter = () => {
      // console.log(`${subject} -  ${examType} - ${examMethod} - ${examDate}`);
      const _examDate =examDate ?  new Date(examDate).toLocaleDateString() : ''
      const data = {
        subjectId : subject,
        examMethod,
        examDate : _examDate
      }
       getExaminationsFromParams(data).then(res => setExaminations(res.data.data))
       setIsShow(false)
      
    }


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
        <div
          className={isShow ? 'my-1 me-1 filter d-block' : 'my-1 me-1 filter'}
          data-kt-user-table-filter='form'
        >
          <div>
            <h3 className='text-dark fw-bolder'>Tùy chọn</h3>
          </div>
          <hr />
          <div className='d-flex justify-content-between flex-column'>
            <div className='mb-4'>
              <label className='form-label fs-6 fw-bold'>Môn thi</label>
              <select
                className='form-select form-select-solid fw-bolder'
                data-kt-select2='true'
                data-placeholder='Select option'
                data-allow-clear='true'
                data-hide-search='true'
                data-kt-user-table-filter='status'
                onChange={(e) => setSubject(e.target.value)}
                value={subject}
              >
                <option value=''>Chọn môn thi</option>
                {subjectsOptions.map((i) => (
                  <option value={i.value} key={i.value}>
                    {i.label}
                  </option>
                ))}
              </select>
            </div>
            {/* --------- */}
            <div className='mb-4'>
              <label className='form-label fs-6 fw-bold'>Loại kỳ thi</label>
              <select
                className='form-select form-select-solid fw-bolder'
                data-kt-select2='true'
                data-placeholder='Select option'
                data-allow-clear='true'
                data-hide-search='true'
                data-kt-user-table-filter='status'
                onChange={(e) => setExamType(e.target.value)}
                value={examType}
              >
                <option value=''>Chọn kỳ thi</option>
                {ExamTypeOptions.map((i) => (
                  <option value={i.value} key={i.value}>
                    {i.label}
                  </option>
                ))}
              </select>
            </div>
            {/* ------ */}
            <div className='mb-4'>
              <label className='form-label fs-6 fw-bold'>Ngày thi</label>

              <input
                className='form-control form-control-solid fw-bolder'
                type={'date'}
                onChange={(e) => setExamDate(e.target.value)}
                value={moment(examDate).format('YYYY-MM-DD')}
              />
            </div>
          </div>
          <div className='mb-4'>
            <label className='form-label fs-6 fw-bold'>Hình thức</label>
            <select
              className='form-select form-select-solid fw-bolder'
              data-kt-select2='true'
              data-placeholder='Select option'
              data-allow-clear='true'
              data-hide-search='true'
              data-kt-user-table-filter='status'
              onChange={(e) => setExamMethod(e.target.value)}
              value={examMethod}
            >
              <option value=''>Chọn hình thức</option>
              {ExamMethodOptions.map((i) => (
                <option value={i.value} key={i.value}>
                  {i.label}
                </option>
              ))}
            </select>
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

export default ExaminationFilter