import {isEmpty} from 'lodash'
import moment from 'moment'
import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {KTCardBody} from '../../../../../_metronic/helpers'
import {deleteExamination, getExaminations} from '../../redux/ExaminationCRUD'
import {getMasterSubjects} from '../../redux/MasterDataCRUD'
import './style/style.scss'
import { useExaminationContext } from './ExaminationContext'
import { ExamMethodOptions } from '../../models/ExaminatonModel'

const ExaminationTable: React.FC = () => {
  const {examinations, setExaminations} = useExaminationContext()
  const navigate = useNavigate()

  const [subjects, setSubjects] = useState([{id: '', name: ''}])

  useEffect(() => {
    getExaminations().then((res) => setExaminations(res.data.data))
  }, [setExaminations])

  useEffect(() => {
    getMasterSubjects().then((res) => setSubjects(res.data.data))
  }, [])

  const findSubjest = (id: string) => {
    return subjects.find((i: any) => i.id === id)
  }

  const findExamMethod = (value: number) => {
    return ExamMethodOptions.find((i: any) => i.value === value)
  }

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Bạn có muốn xóa kỳ thi ${name}`)) {
      deleteExamination(id).then(() => {
        getExaminations().then((res) => setExaminations(res.data.data))
      })
    }
  }

  // useEffect(() => {
  //   console.log(examinations)
  // }, [examinations])

  return (
    <>
      <KTCardBody className='py-5'>
        <div className='table-responsive'>
          <table
            id='kt_datatable_examinations'
            className='table table-row-bordered gy-5 text-gray-600 fw-bold'
          >
            <thead>
              <tr className='fw-bold fs-6 text-muted'>
                <th>STT</th>
                <th>TÊN KỲ THI</th>
                <th>MÔN THI</th>
                <th>NGÀY THI</th>
                <th>THỜI LƯỢNG</th>
                <th>HÌNH THỨC</th>
                <th>ĐIỂM THI</th>
                <th>HỌC VIÊN </th>
                <th>TÁC VỤ</th>
              </tr>
            </thead>
            <tbody className='fs-6'>
              {!isEmpty(examinations) ? (
                examinations.map((examination, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{examination.name}</td>
                    <td>{findSubjest(examination.subjectId)?.name}</td>
                    <td>{moment(examination.examDate).format('DD/MM/YYYY')}</td>
                    <td>{examination.examMinute}</td>
                    <td>{findExamMethod(examination.examMethod)?.label}</td>
                    <td className='color-blue'>
                      <span
                        onClick={() => {
                          navigate(`/admin/examinationMark`, {state: examination.id})
                        }}
                      >
                        Xem
                      </span>
                    </td>
                    <td>1 tỷ</td>
                    <td>
                      <button
                        className='btn btn-sm btn-clean btn-icon btn-icon-md'
                        onClick={() => {
                          navigate(`/admin/examinationForm`, {state: examination.id})
                        }}
                      >
                        <i className='fas fa-edit mx-3' />
                      </button>
                      <button
                        className='btn btn-sm btn-clean btn-icon btn-icon-md'
                        onClick={() => handleDelete(examination.id, examination.name)}
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

export default ExaminationTable
