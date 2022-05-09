import React, {useEffect} from 'react'
import {useCourseContext} from './CourseContext'

import moment from 'moment'
import {useNavigate} from 'react-router-dom'
import {KTCardBody} from '../../../../../_metronic/helpers'
import {deleteCourse, getAllCourses} from '../../redux/CourseCRUD'

const CourseTable: React.FC = () => {
  const {courses, setCourses} = useCourseContext()
  const navigate = useNavigate()
  useEffect(() => {
    getAllCourses('').then((res) => setCourses(res.data.data))
  }, [setCourses])

  const handleDelete = (id: string, courseName: string) => {
    if (window.confirm(`Xóa khóa học: ${courseName}?`)) {
      deleteCourse(id).then(() => {
        getAllCourses('').then((res) => setCourses(res.data.data))
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
                <th>Tên khóa học</th>
                <th>Số lớp</th>
                <th>Số buổi</th>
                <th>Học phí (đ)</th>
                <th>Ngày tạo</th>
                <th>Tác vụ</th>
              </tr>
            </thead>
            <tbody className='fs-6'>
              {courses?.length > 0 ? (
                courses?.map((element, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{element.courseName}</td>
                    <td>{element.numberOfClass}</td>
                    <td>{element.numberOfSession}</td>
                    <td>{Intl.NumberFormat('vi-VN').format(element.price)}</td>
                    <td>{moment(element.createdAt).format('DD/MM/YYYY')}</td>
                    <td>
                      <button
                        className='btn btn-sm btn-clean btn-icon btn-icon-md'
                        onClick={() => {
                          navigate(`/admin/courseForm`, {state: element.id})
                        }}
                      >
                        <i className='fas fa-edit mx-3' />
                      </button>
                      <button
                        className='btn btn-sm btn-clean btn-icon btn-icon-md'
                        onClick={() => handleDelete(element.id, element.courseName)}
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

export default CourseTable
