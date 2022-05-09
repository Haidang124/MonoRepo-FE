import {Field, Form, Formik} from 'formik'
import {Button, Col, Row} from 'react-bootstrap'
import React, {useEffect, useState} from 'react'
import * as Yup from 'yup'
import {useLocation, useNavigate} from 'react-router-dom'
import {AgeGroupOptions, Classroom, StateOptions} from './modal/ClassroomModal'
import Select from 'react-select'
import {createClassroom, getClassroomById, updateClassroom} from '../../redux/ClassroomCRUD'
import {toast} from 'react-toastify'

const ClassroomForm: React.FC = () => {
  const [classroom, setClassroom] = useState<Classroom>({} as Classroom)
  const {state} = useLocation()
  const navigate = useNavigate()
  const ClassroomSchema = Yup.object().shape({
    name: Yup.string().required('Nhập tên phòng học'),
    floor: Yup.string().required('Nhập tên tầng'),
    // curriculum: Yup.string().required('Nhập giáo trình'),
    // status: Yup.string().required('Nhập trạng thái'),
    // eLearning: Yup.string().required('Nhập E-Learning'),
  })
  useEffect(() => {
    if (state) {
      getClassroomById(state).then((res) => {
        setClassroom(res.data.data)
      })
    }
  }, [state])
  const handleSubmit = (values: any) => {
    let newClassroom = {
      name: values.name,
      floor: values.floor,
      description: values.description,
      classroomInfo: {
        classroomState: values.classroomState,
        capacity: values.capacity,
        ageGroup: values.ageGroup,
      },
    }
    if (!state) {
      createClassroom(newClassroom).then((res) => {
        if (res.status === 200) {
          toast('Thêm phòng học thành công')
        }
      })
    } else {
      updateClassroom(state, newClassroom).then((res) => {
        if (res.status === 200) {
          toast('Cập nhật phòng học thành công')
        }
      })
    }
  }
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        name: classroom.name,
        floor: classroom.floor,
        description: classroom.description,
        classroomState: classroom.classInfo?.classroomState,
        capacity: classroom.classInfo?.capacity,
        ageGroup: classroom.classInfo?.ageGroup,
      }}
      validationSchema={ClassroomSchema}
      onSubmit={handleSubmit}
    >
      {({values, errors, setFieldValue}) => (
        <Form>
          <Row>
            <Col className='col-xl-8 col-12'>
              <div className='center-page card'>
                <div className='card-body center-info'>
                  <div className='d-flex justify-content-center'>
                    <h3>{!state ? `TẠO LỚP HỌC MỚI` : `THÔNG TIN PHÒNG HỌC`}</h3>
                  </div>
                  <div className='mt-5'>
                    <Row className='mb-3'>
                      <Col>
                        <div className='d-flex justify-content-center align-items-center form-group'>
                          <label className='form-label required'>Tên phòng học</label>
                          <Col>
                            <Field
                              type='text'
                              className='form-control'
                              placeholder='Nhập tên phòng học'
                              name='name'
                            />
                            {errors.name ? <div className='error-text'>{errors.name}</div> : null}
                          </Col>
                        </div>
                      </Col>
                      <Col>
                        <div className='d-flex align-items-center form-group'>
                          <label className='form-label required'>Tầng</label>
                          <Col>
                            <Field
                              type='number'
                              className='form-control'
                              placeholder='Nhập tầng'
                              name='floor'
                            />
                            {errors.floor ? <div className='error-text'>{errors.floor}</div> : null}
                          </Col>
                        </div>
                      </Col>
                    </Row>
                    <Row className='mb-3'>
                      <div className='d-flex justify-content-center align-items-center form-group'>
                        <label className='form-label'>Mô tả</label>
                        <Col>
                          <Field
                            type='text'
                            className='form-control'
                            placeholder='Nhập mô tả chi tiết về phòng học'
                            name='description'
                          />
                          {errors.description ? (
                            <div className='error-text'>{errors.description}</div>
                          ) : null}
                        </Col>
                      </div>
                    </Row>
                  </div>
                  <div className='footer d-flex justify-content-end'>
                    <Button className='btn btn-secondary' onClick={() => navigate(-1)}>
                      Hủy bỏ
                    </Button>
                    <Button className='btn btn-primary' type='submit'>
                      Hoàn tất
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
            <Col className='col-xl-4 col-12'>
              <div className='center-page card'>
                <div className='card-body'>
                  <div className='right-info'>
                    <div className='title-section d-flex justify-content-center'>
                      <h3>THÔNG TIN CHI TIẾT</h3>
                    </div>
                    <div className='mt-5'>
                      <Row className='mb-3'>
                        <div className='d-flex justify-content-center align-items-center form-group'>
                          <label className='form-label required'>Trạng thái</label>
                          <Col>
                            <Select
                              key={'classroomStateType'}
                              className='basic-select w-100'
                              classNamePrefix='select'
                              isSearchable={true}
                              options={StateOptions}
                              value={StateOptions.find((t) => t.value === values.classroomState)}
                              onChange={(e) => setFieldValue('classroomState', e?.value)}
                            />
                          </Col>
                        </div>
                      </Row>
                      <Row className='mb-3'>
                        <div className='d-flex justify-content-center align-items-center form-group'>
                          <label className='form-label required'>Sức chứa</label>
                          <Col>
                            <Field
                              type='number'
                              className='form-control'
                              placeholder='Nhập sức chứa'
                              name='capacity'
                            />
                          </Col>
                        </div>
                      </Row>
                      <Row className='mb-3'>
                        <div className='d-flex justify-content-center align-items-center form-group'>
                          <label className='form-label required'>Nhóm tuổi</label>
                          <Col>
                            <Select
                              key={'ageGroupType'}
                              className='basic-select w-100'
                              classNamePrefix='select'
                              isSearchable={true}
                              options={AgeGroupOptions}
                              value={AgeGroupOptions.find((t) => t.value === values.ageGroup)}
                              onChange={(e) => setFieldValue('ageGroup', e?.value)}
                            />
                          </Col>
                        </div>
                      </Row>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  )
}
export default ClassroomForm
