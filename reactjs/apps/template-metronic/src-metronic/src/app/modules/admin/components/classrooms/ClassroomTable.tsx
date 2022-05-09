import React, {useEffect} from 'react'
import {KTCardBody} from '../../../../../_metronic/helpers'
import {useClassroomContext} from './ClassroomContext'
import {useNavigate} from 'react-router-dom'
import {deleteClassroom, getAllClassrooms} from '../../redux/ClassroomCRUD'
import {AgeGroupOptions, StateOptions} from './modal/ClassroomModal'
import './style/style.scss'

const ClassroomTable: React.FC = () => {
  const {classrooms, setClassrooms} = useClassroomContext()
  const navigate = useNavigate()
  useEffect(() => {
    getAllClassrooms().then((res) => setClassrooms(res.data.data))
  }, [setClassrooms])
  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Xóa lớp học: ${name}?`)) {
      deleteClassroom(id).then(() => {
        getAllClassrooms().then((res) => setClassrooms(res.data.data))
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
                <th className='table-center '>STT</th>
                <th className='table-left'>Tên phòng học</th>
                <th className='table-left'>Trạng thái</th>
                <th className='table-center'>Tầng</th>
                <th className='table-center'>Sức chứa</th>
                <th className='table-left'>Nhóm tuổi</th>
                <th className='table-center'>Tác vụ</th>
              </tr>
            </thead>
            <tbody className='fs-6'>
              {classrooms?.length > 0 ? (
                classrooms?.map((element, index) => (
                  <tr key={index}>
                    <td className='table-center'>{index + 1}</td>
                    <td className='table-left'>{element.name}</td>
                    <td className='table-left'>
                      {
                        StateOptions.find((t) => t.value === element.classInfo.classroomState)
                          ?.label
                      }
                    </td>
                    <td className='table-center'>{element.floor}</td>
                    <td className='table-center'>{element.classInfo.capacity}</td>
                    <td className='table-left'>
                      {AgeGroupOptions.find((t) => t.value === element.classInfo.ageGroup)?.label}
                    </td>
                    <td className='table-center'>
                      <button
                        className='btn btn-sm btn-clean btn-icon btn-icon-md'
                        onClick={() => {
                          navigate(`/admin/classroomForm`, {state: element.id})
                        }}
                      >
                        <i className='fas fa-edit mx-3' />
                      </button>
                      <button
                        className='btn btn-sm btn-clean btn-icon btn-icon-md'
                        onClick={() => handleDelete(element.id, element.name)}
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

export default ClassroomTable
