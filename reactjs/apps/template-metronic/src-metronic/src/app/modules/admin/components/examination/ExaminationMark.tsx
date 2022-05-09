import moment from 'moment'
import React, {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import {KTCardBody, KTSVG} from '../../../../../_metronic/helpers'
import { Examination } from '../../models/ExaminatonModel'
import {getExaminationById} from '../../redux/ExaminationCRUD'
import ExaminationMarkHeader from './ExaminationMarkHeader'

const ExaminationMark: React.FC = () => {
  const {state} = useLocation()
  const [examination, setExamination] = useState<Examination>({} as Examination)
  useEffect(() => {
    getExaminationById(state).then((res) => setExamination(res.data.data))
  }, [])

  useEffect(() => {
      console.log(examination);
      
  },[examination])
  return (
    <>
        <div className='d-flex justify-content-between mb-5'>
            <h1>{examination.name}</h1>
            <button
          type='button'
          className='btn btn-primary'
        //   onClick={() => {
        //     navigate(`/admin/examinationForm`)
        //   }}
        >
          GỬI PHỤ HUYNH
        </button>
        </div>
        <div className='card'>

        <ExaminationMarkHeader/>
      <KTCardBody className=' p-5'>
        <div className='table-responsive'>
          <table
            id='kt_datatable_examinationMark'
            className='table table-row-bordered gy-5 text-gray-600 fw-bold'
          >
            <thead>
              <tr className='fw-bold fs-6 text-muted'>
                <th>STT</th>
                <th>TÊN HỌC VIÊN</th>
                <th>NGÀY SINH</th>
                <th>LỚP HỌC</th>
                <th>NGÀY THI</th>
                <th>GIÁO VIÊN CHẤM THI</th>
                <th colSpan={2}>NHẬN XÉT CỦA GIÁO VIÊN</th>
                <th>TÁC VỤ</th>
              </tr>
            </thead>
            <tbody className='fs-6'>
                <tr>
                    <td>1</td>
                    <td>aaa</td>
                    <td>{moment(new Date()).format('YYYY-MM-DD')}</td>
                    <td>1</td>
                    <td>{moment(examination.examDate).format('YYYY-MM-DD')}</td>
                    <td>aaaaa</td>
                    <td colSpan={2}>nhap nhan xet</td>
                    <td><button
                        className='btn btn-sm btn-save btn-icon btn-icon-md'
                        onClick={() => {
                        //   navigate(`/admin/examinationForm`, {state: examination.id})
                        }}
                      >
                        <i className="fas fa-save"></i>
                      </button>
                      <button
                        className='btn btn-sm btn-clean btn-icon btn-icon-md'
                        // onClick={() => handleDelete(examination.id, examination.name)}
                      >
                        <i className='fa fa-trash' />
                      </button></td>
                </tr>
            </tbody>
          </table>
        </div>
      </KTCardBody>
        </div>
    </>
  )
}

export default ExaminationMark
