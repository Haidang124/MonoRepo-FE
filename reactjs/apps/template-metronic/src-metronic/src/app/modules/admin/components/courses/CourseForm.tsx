import React, {useEffect, useState} from 'react'
import {Field, Form, Formik} from 'formik'
import {Button, Col, Row} from 'react-bootstrap'
import Select from 'react-select'
import './style/style.scss'
import * as Yup from 'yup'
import {Course, StatusOptions, Subject} from './modal/CourseModal'
import {toast} from 'react-toastify'
import {useLocation, useNavigate} from 'react-router-dom'
import NumberFormat from 'react-number-format'
import {createCourse, getAllSubjects, getCourseById, updateCourse} from '../../redux/CourseCRUD'

const CourseForm: React.FC = () => {
  const CourseSchema = Yup.object().shape({
    courseName: Yup.string().required('Nhập tên khóa học'),
    subjectId: Yup.string().required('Nhập môn học'),
    curriculum: Yup.string().required('Nhập giáo trình'),
    status: Yup.string().required('Nhập trạng thái'),
    // eLearning: Yup.string().required('Nhập E-Learning'),
  })
  const [subjects, setSubjects] = useState<Array<Subject>>([])
  const [course, setCourse] = useState<Course>({} as Course)
  const {state} = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    getAllSubjects().then((res) => {
      setSubjects(res.data)
    })
  }, [])

  useEffect(() => {
    if (state) {
      getCourseById(state).then((res) => {
        setCourse(res.data.data)
      })
    }
  }, [state])

  const handleSubmit = (values: any) => {
    let newCourse = {
      courseName: values.courseName,
      subjectId: values.subjectId,
      curriculum: values.curriculum,
      // "eLearningId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      description: values.description,
      status: values.status,
      numberOfSession: values.numberOfSession,
      price: values.price,
      minNumberOfStudent: values.minNumberOfStudent,
      maxNumberOfStudent: values.maxNumberOfStudent,
    }
    if (!state) {
      createCourse(newCourse).then((res) => {
        if (res.status === 200) {
          toast('Thêm khóa học thành công')
          navigate(-1)
        }
      })
    } else {
      updateCourse(state, newCourse).then((res) => {
        if (res.status === 200) {
          toast('Cập nhật khóa học thành công')
        }
      })
    }
  }

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        courseName: course.courseName,
        subjectId: course.subjectId,
        curriculum: course.curriculum,
        description: course.description,
        status: course.status,
        numberOfSession: course.numberOfSession,
        price: course.price,
        minNumberOfStudent: course.minNumberOfStudent,
        maxNumberOfStudent: course.maxNumberOfStudent,
      }}
      validationSchema={CourseSchema}
      onSubmit={handleSubmit}
    >
      {({values, errors, setFieldValue}) => (
        <Form>
          <Row>
            <Col className='col-xl-8 col-12'>
              <div className='center-page card'>
                <div className='card-body center-info'>
                  <div className='d-flex justify-content-center'>
                    <h3>TẠO KHÓA HỌC MỚI</h3>
                  </div>
                  <div className='mt-5'>
                    <Row className='mb-3'>
                      <Col>
                        <div className='d-flex justify-content-center align-items-center form-group'>
                          <label className='form-label required'>Tên khóa học</label>
                          <Col>
                            <Field
                              type='text'
                              className='form-control'
                              placeholder='Nhập tên khóa học'
                              name='courseName'
                            />
                            {errors.courseName ? (
                              <div className='error-text'>{errors.courseName}</div>
                            ) : null}
                          </Col>
                        </div>
                      </Col>
                      <Col>
                        <div className='d-flex align-items-center form-group'>
                          <label className='form-label required'>Môn học</label>
                          <Col>
                            <Select
                              key={'genderType'}
                              className='basic-select w-100'
                              classNamePrefix='select'
                              isSearchable={true}
                              options={subjects}
                              getOptionLabel={(option: any) => option.name}
                              getOptionValue={(option: any) => option.id}
                              value={subjects.find((t) => t?.id === values.subjectId)}
                              onChange={(e) => setFieldValue('subjectId', e?.id)}
                            />
                            {errors.subjectId ? (
                              <div className='error-text'>{errors.subjectId}</div>
                            ) : null}
                          </Col>

                          <button
                            className='btn btn-info ms-3'
                            onClick={() => navigate('/admin/subjectDetail')}
                          >
                            +
                          </button>
                        </div>
                      </Col>
                    </Row>
                    <Row className='mb-3'>
                      <div className='d-flex justify-content-center align-items-center form-group'>
                        <label className='form-label required'>Giáo trình</label>
                        <Col>
                          <Field
                            type='text'
                            className='form-control'
                            placeholder='Nhập tên giáo trình'
                            name='curriculum'
                          />
                          {errors.curriculum ? (
                            <div className='error-text'>{errors.curriculum}</div>
                          ) : null}
                        </Col>
                      </div>
                    </Row>
                    {/*<Row className='mb-3'>*/}
                    {/*  <div className='d-flex justify-content-center align-items-center form-group'>*/}
                    {/*    <label className='form-label required'>E-Learning</label>*/}
                    {/*    <Col>*/}
                    {/*      <Field*/}
                    {/*        type='text'*/}
                    {/*        className='form-control'*/}
                    {/*        placeholder='Chọn khóa học E-Learning'*/}
                    {/*        name='eLearning'*/}
                    {/*      />*/}
                    {/*      {errors.eLearning ? (*/}
                    {/*        <div className='error-text'>{errors.eLearning}</div>*/}
                    {/*      ) : null}*/}
                    {/*    </Col>*/}
                    {/*  </div>*/}
                    {/*</Row>*/}
                    <Row className='mb-3'>
                      <div className='d-flex justify-content-center align-items-center form-group'>
                        <label className='form-label'>Mô tả</label>
                        <Col>
                          <Field
                            type='text'
                            className='form-control'
                            placeholder='Mô tả chi tiết về khóa học'
                            name='description'
                          />
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
                              key={'statusType'}
                              className='basic-select w-100'
                              classNamePrefix='select'
                              isSearchable={true}
                              options={StatusOptions}
                              value={StatusOptions.find((t) => t.value === values.status)}
                              onChange={(e) => setFieldValue('status', e?.value)}
                            />
                            {errors.status ? (
                              <div className='error-text'>{errors.status}</div>
                            ) : null}
                          </Col>
                        </div>
                      </Row>
                      <Row className='mb-3'>
                        <div className='d-flex justify-content-center align-items-center form-group'>
                          <label className='form-label required'>Số buổi</label>
                          <Col>
                            <Field
                              type='number'
                              className='form-control'
                              placeholder='Nhập số buổi'
                              name='numberOfSession'
                            />
                          </Col>
                        </div>
                      </Row>
                      <Row className='mb-3'>
                        <div className='d-flex justify-content-center align-items-center form-group'>
                          <label className='form-label required'>Học phí/buổi</label>
                          <Col>
                            {/*<Field*/}
                            {/*  type='text'*/}
                            {/*  className='form-control'*/}
                            {/*  placeholder='Nhập học phí/buổi'*/}
                            {/*  name='price'*/}
                            {/*/>*/}
                            <NumberFormat
                              className='form-control'
                              placeholder='Nhập học phí/buổi'
                              thousandSeparator={true}
                              name='price'
                              value={values.price}
                              onValueChange={(values) => setFieldValue('price', values.value)}
                            />
                          </Col>
                        </div>
                      </Row>
                      <Row className='mb-3'>
                        <div className='d-flex justify-content-center align-items-center form-group'>
                          <label className='form-label '>Sĩ số tối thiểu</label>
                          <Col>
                            <Field
                              type='number'
                              className='form-control'
                              placeholder='Nhập sĩ số tối thiểu'
                              name='minNumberOfStudent'
                            />
                          </Col>
                        </div>
                      </Row>
                      <Row className='mb-3'>
                        <div className='d-flex justify-content-center align-items-center form-group'>
                          <label className='form-label'>Sĩ số tối đa</label>
                          <Col>
                            <Field
                              type='number'
                              className='form-control'
                              placeholder='Nhập sĩ số tối đa'
                              name='maxNumberOfStudent'
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
export default CourseForm
