import React, {useEffect, useState} from 'react'
import {Field, Form, Formik} from 'formik'
import {Button, Col, Row} from 'react-bootstrap'
import Select from 'react-select'
import './style/style.scss'
import * as Yup from 'yup'
import {toast} from 'react-toastify'
import {useLocation, useNavigate} from 'react-router-dom'
import { Examination, ExamMethodOptions, ExamTypeOptions } from '../../models/ExaminatonModel'
import SVG from 'react-inlinesvg'
import {toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {isEmpty, isNull} from 'lodash'
import {getMasterSubjects} from '../../redux/MasterDataCRUD'
import {getAllClasses} from '../../../customer/redux/ClassCRUD'
import {createExaminations, getExaminationById, updateExamination} from '../../redux/ExaminationCRUD'
import {getAllTeacher} from '../../../customer/redux/TeacherCRUD'
import {getAllClassrooms} from '../../redux/ClassroomCRUD'
import {initExaminations} from './ExaminationContext'
import {shallowEqual, useSelector} from 'react-redux'
import {UserModel} from '../../../auth/models/UserModel'
import {RootState} from '../../../../../setup'
import moment from 'moment'

const ExaminationForm: React.FC = () => {


  const user = useSelector<RootState, UserModel>(({auth}) => auth.user as UserModel, shallowEqual)
  const [examination, setExamintion] = useState<Examination>({} as Examination)
  const {state} = useLocation()
  const navigate = useNavigate()
  const [examTeachers, setExamTeachers] = useState<any[]>([])
  const [scoreTeachers, setScoreTeachers] = useState<any[]>([])
  const [showInfo, setShowInfo] = useState<boolean>(true)
  const [timeInfo, setTimeInfo] = useState<boolean>(true)

  const [subjectsOptions, setSubjectsOptions] = useState([{value: '', label: ''}])
  const [classesOptions, setClassesOptions] = useState([{value: '', label: ''}])
  const [teachers, setTeachers] = useState<any[]>([])
  const [classroomsOptions, setClassroomsOptions] = useState([{value: '', label: ''}])
  const [showPopUpExam, setShowPopUpExam] = useState(false)
  const [showPopUpScore, setShowPopUpScore] = useState(false)

  useEffect(() => {
    if(state) {
      getExaminationById(state).then((res) => setExamintion(res.data.data))
    }
  },[state,setExamintion])

  useEffect(() => {
    if(!isEmpty(examination)) {


      const examTeachers = examination.examTeachers.filter(i => i.type === 0)
      if(!isEmpty(examTeachers)) {
        const list = examTeachers.map(i => ({employeeId : i.employeeId, name : i.employee?.user?.fullName, type : i.type}))
        
        setExamTeachers(list)
      }

      const scoreTeachers = examination.examTeachers.filter(i => i.type === 1)
      if(!isEmpty(scoreTeachers)) {
        const list = scoreTeachers.map(i => ({employeeId : i.employeeId, name : i.employee?.user?.fullName, type : i.type}))
        
        setScoreTeachers(list)
      }

    }
  },[examination])
  

  useEffect(() => {
    getMasterSubjects().then((res) => {
      const list = res.data.data.map((item: any) => ({value: item.id, label: item.name}))
      setSubjectsOptions(list)
    })
  }, [])

  useEffect(() => {
    getAllClasses().then((res) => {
      if (!isEmpty(res.data.data)) {
        const list = res.data.data.map((item: any) => ({value: item.id, label: item.className}))
        setClassesOptions(list)
      }
    })
  }, [])

  useEffect(() => {
    getAllClassrooms().then((res) => {
      if (!isEmpty(res.data.data)) {
        const list = res.data.data.map((i: any) => ({value: i.id, label: i.name}))
        setClassroomsOptions(list)
      }
    })
  }, [])

  useEffect(() => {
    setShowInfo(true)
    setTimeInfo(true)
  }, [])

  useEffect(() => {
    getAllTeacher(user.id).then((res) => {
      
      if (!isEmpty(res.data.data)) {
        const list = res.data.data.map((i: any) => ({employeeId: i.id, name: i.user.fullName}))
        setTeachers(list)
      }
    })
  }, [])

  const validate = (values : any) => {
    const errors ={name : '',subjectId : '',  examType: '', examMethod : ''}

    if(!values.name) {
      errors.name = "Nhập tên kỳ thi"
    }
    if(!values.subjectId) {
      errors.subjectId = 'Nhập môn thi '
    }

    if(isNull(values.examType)){
      errors.examType = 'Nhập phương thức thi '
    }

    if(isNull(values.examMethod)) {
      errors.examMethod = 'Nhập hình thức thi'
    }

    return errors
  }

  const handleTogglePopUp = (type: string) => {
    if (type === 'exam') {
      setShowPopUpExam(!showPopUpExam)
    } else {
      setShowPopUpScore(!showPopUpScore)
    }
  }

  const handleClosePopUp = (type: string) => {
    if (type === 'exam') {
      setShowPopUpExam(false)
    } else {
      setShowPopUpScore(false)
    }
  }

  const handleAdd = (value: any, type: any) => {
    if (type === 'addExamTeacher') {
      if (examTeachers.find((examTeacher) => examTeacher.employeeId === value.employeeId)) {
        return 0
      } else {
        setExamTeachers([...examTeachers, {...value, type: 0}])
      }
    } else {
      if (scoreTeachers.find((teacher) => teacher.employeeId === value.employeeId)) {
        return
      } else {
        setScoreTeachers([...scoreTeachers, {...value, type: 1}])
      }
    }
  }

  const handleSubmit = (e: any, values: any) => {
    e.preventDefault()

    const newExam = {...values, examTeachers: [...examTeachers, ...scoreTeachers]}

    if (!state) {
      
      createExaminations(newExam).then((res) => toast.success('Thêm thành công !!!'))
    } else {
      
      updateExamination(state, newExam).then((res) => toast.success('Cập nhập thành công'))
    }
  }

  return (
    <Formik
      enableReinitialize={true}
      initialValues={state ? {...examination, examDate : moment(examination.examDate).format('YYYY-MM-DD')} : initExaminations}
      validate={validate}
      onSubmit={handleSubmit}
    >
      {({values, errors, touched, setFieldValue}) => (
        <Form onSubmit={(e) => handleSubmit(e, values)}>
          <Row>
            <Col className='col-xl-8 col-12'>
              <div className='center-page card'>
                <div className='card-body center-info'>
                  <div className='d-flex justify-content-center'>
                    <h3>TẠO KỲ THI MỚI</h3>
                  </div>
                  <div className='accordion accordion-icon-toggle' id='axam_accordion_1'>
                    <div className='center-info'>
                      <div className='mb-5'>
                        <div
                          className='accordion-header py-3 d-flex'
                          data-bs-toggle='collapse'
                          data-bs-target='#axam_accordion_1_item_1'
                        >
                          <span className='accordion-icon'>
                            <span className='svg-icon svg-icon-4'>
                              <SVG src={toAbsoluteUrl('/media/icons/duotune/arrows/arr064.svg')} />
                            </span>
                          </span>
                          <h3 className='fs-4 fw-bold mb-0 ms-4'>THÔNG TIN KỲ THI</h3>
                        </div>
                        <div id='axam_accordion_1_item_1' className='fs-6 collapse show ps-10'>
                          {showInfo && (
                            <div className='mt-5'>
                              <Row className='mb-3'>
                                <Col>
                                  <div className='d-flex justify-content-center align-items-center form-group'>
                                    <label className='form-label required'>Tên kỳ thi</label>
                                    <Col>
                                      <Field
                                        type='text'
                                        className='form-control'
                                        placeholder='Nhập tên kỳ thi'
                                        name='name'
                                      />
                                      {errors.name && (
                                        <div className='errors-text'>{errors.name}</div>
                                      )}
                                    </Col>
                                  </div>
                                </Col>
                                <Col>
                                  <div className='d-flex justify-content-center align-items-center form-group'>
                                    <label className='form-label required'>Môn thi</label>
                                    <Col>
                                      <Select
                                        key={'nameExamType'}
                                        className='basic=select w-100'
                                        classNamePrefix={'select'}
                                        isSearchable={true}
                                        options={subjectsOptions}
                                        onChange={(e) => setFieldValue('subjectId', e?.value)}
                                        value={subjectsOptions.find(
                                          (i) => i.value === values.subjectId
                                        )}
                                      ></Select>
                                      {errors.subjectId && (
                                        <div className='errors-text'>{errors.subjectId}</div>
                                      )}
                                    </Col>
                                  </div>
                                </Col>
                              </Row>
                              {/* ---------- */}
                              <Row className='mb-3'>
                                <Col>
                                  <div className='d-flex justify-content-center align-items-center form-group'>
                                    <label className='form-label required'>Loại kỳ thi</label>
                                    <Col>
                                      <Select
                                        key={'examTypeType'}
                                        className='basic=select w-100'
                                        classNamePrefix={'select'}
                                        isSearchable={true}
                                        options={ExamTypeOptions}
                                        value={ExamTypeOptions.find(
                                          (i) => i.value === values.examMethod
                                        )}
                                        onChange={(e) => setFieldValue('examType', e?.value)}
                                      ></Select>
                                      {errors.examType && (
                                        <div className='errors-text'>{errors.examType}</div>
                                      )}
                                    </Col>
                                  </div>
                                </Col>
                                <Col>
                                  <div className='d-flex justify-content-center align-items-center form-group'>
                                    <label className='form-label'>Chọn lớp học</label>
                                    <Col>
                                      <Select
                                        key={'nameExamType'}
                                        className='basic=select w-100'
                                        classNamePrefix={'select'}
                                        isSearchable={true}
                                        options={classesOptions}
                                        value={classesOptions.find(
                                          (i) => i.value === values.classId
                                        )}
                                        onChange={(e) => setFieldValue('classId', e?.value)}
                                      ></Select>
                                      {/* {
                                            errors.nameExam && <div className="errors-text">{errors.nameExam}</div>
                                        } */}
                                    </Col>
                                  </div>
                                </Col>
                              </Row>
                              {/* -------col-3 */}
                              <Row className='mb-3'>
                                <Col>
                                  <div className='d-flex justify-content-center align-items-center form-group'>
                                    <label className='form-label '>Ghi chú</label>
                                    <Col>
                                      <Field
                                        type='text'
                                        className='form-control'
                                        placeholder='Nhập tên ghi chú'
                                        name='note'
                                      />
                                    </Col>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          )}
                        </div>
                        {/* ---END INFO ---- */}
                      </div>
                      <div className='mb-5'>
                        <div
                          className='accordion-header py-3 d-flex'
                          data-bs-toggle='collapse'
                          data-bs-target='#exam_accordion_1_item_2'
                        >
                          <span className='accordion-icon'>
                            <span className='svg-icon svg-icon-4'>
                              <SVG src={toAbsoluteUrl('/media/icons/duotune/arrows/arr064.svg')} />
                            </span>
                          </span>
                          <h3 className='fs-4 fw-bold mb-0 ms-4'>THÔNG TIN THỜI GIAN</h3>
                        </div>
                        <div id='exam_accordion_1_item_2' className='fs-6 collapse show ps-10'>
                          {timeInfo && (
                            <div className='mt-5'>
                              <Row className='mb-3'>
                                <Col>
                                  <div className='d-flex justify-conten-center align-items-center form-group'>
                                    <label className='form-label'>Ngày thi</label>
                                    { (
                                      <Col>
                                        <Field
                                          type='date'
                                          className='form-control'
                                          name='examDate'
                                        />
                                      </Col>
                                    ) }
                                  </div>
                                </Col>
                                <Col>
                                  <div className='d-flex justify-conten-center align-items-center form-group'>
                                    <label className='form-label'>Giờ thi</label>
                                    <Col>
                                      <Field
                                        type='number'
                                        className='form-control'
                                        placeholder='...'
                                        name='examHour'
                                      />
                                    </Col>
                                  </div>
                                </Col>
                                <Col className='mt-5'>
                                  <div className='d-flex justify-conten-center align-items-center form-group'>
                                    <label className='form-label'>Thời lượng (phút)</label>
                                    <Col>
                                      <Field
                                        type='number'
                                        className='form-control'
                                        placeholder='...'
                                        name='examMinute'
                                      />
                                    </Col>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
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
            <Col className={`col-xl-4 col-12`}>
              <div className='center-page card'>
                <div className='card-body'>
                  <div className='mb-3'>
                    <div>
                      <h3 className='fs-4 fw-ld mbbo-0 ms-4'>THÔNG TIN CHI TIẾT</h3>
                    </div>
                    <div className='mt-5'>
                      <Row className='mb-3'>
                        <div className='d-flex justify-content-center align-items-center form-group'>
                          <label className='form-label required'>Hình thức thi </label>

                          <Col className='ms-5'>
                            <Select
                              className='basic-select w-100'
                              key='examMethod'
                              classNamePrefix={'select'}
                              isSearchable={true}
                              options={ExamMethodOptions}
                              value={ExamMethodOptions.find(i => i.value === values.examMethod)}
                              onChange={(e) => setFieldValue('examMethod', e?.value)}
                            ></Select>
                            {errors.examMethod && (
                              <div className='errors-text'>{errors.examMethod}</div>
                            )}
                          </Col>
                        </div>
                      </Row>
                    </div>
                    <div className='mt-5'>
                      <Row className='mb-3'>
                        <div className='d-flex justify-content-center align-items-center form-group'>
                          <label className='form-label'>Phòng thi </label>

                          <Col className='ms-5'>
                            <Select
                              className='basic-select w-100'
                              key='examinnationRoomType'
                              classNamePrefix={'select'}
                              isSearchable={true}
                              options={classroomsOptions}
                              value={classroomsOptions.find(i => i.value === values.classroomId)}
                              onChange={(e) => setFieldValue('classroomId', e?.value)}
                            ></Select>
                          </Col>
                        </div>
                      </Row>
                    </div>
                    <div className='mt-5'>
                      <Row className='mb-3'>
                        <div className='d-flex justify-content-center align-items-center form-group'>
                          <label className='form-label'>Học viên tham gia </label>

                          <Col className='ms-5'>
                            <Field
                              type='number'
                              className='form-control'
                              placeholder='Nhập số lượng học viên tham gia'
                              name='numberStudent'
                            />
                          </Col>
                        </div>
                      </Row>
                    </div>
                  </div>
                  {/* ----right col-2 */}
                  <div className='mb-3'>
                    <div>
                      <h3 className='fs-4 fw-ld mbbo-0 ms-4'>THÔNG TIN GIÁO VIÊN</h3>
                    </div>
                    <div className='mt-5'>
                      <Row className='mb-3'>
                        <div className='my-5 d-flex align-items-center justify-content-between'>
                          <label className='form-label'>Giáo viên coi thi </label>
                          <div className='btn-add'>
                            <i
                              className='fa fa-plus'
                              aria-hidden='true'
                              onClick={() => handleTogglePopUp('exam')}
                            ></i>
                            <div
                              className={!showPopUpExam ? `examTeacher` : `examTeacher dis-block`}
                              onMouseLeave={() => handleClosePopUp('exam')}
                            >
                              {!isEmpty(teachers) &&
                                teachers.map((teacher) => (
                                  <div
                                    key={teacher.employeeId}
                                    className='mb-3 teacher'
                                    onClick={() => handleAdd(teacher, 'addExamTeacher')}
                                  >
                                    {teacher.name}
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                      </Row>
                      {!isEmpty(examTeachers) &&
                        examTeachers.map((examTeacher, index) => (
                          <div key={index} className='d-flex justify-content-between show-teacher'>
                            <i className='fa fa-user' aria-hidden='true'></i>
                            <div>{examTeacher.name}</div>
                          </div>
                        ))}
                    </div>
                    <div className='mt-5'>
                      <Row className='mb-3'>
                        <div className='my-5 d-flex align-items-center justify-content-between'>
                          <label className='form-label'>Giáo viên chấm thi </label>
                          <div className='btn-add'>
                            <i
                              className='fa fa-plus'
                              aria-hidden='true'
                              onClick={() => handleTogglePopUp('score')}
                            ></i>
                            <div
                              className={!showPopUpScore ? `examTeacher` : `examTeacher dis-block`}
                              onMouseLeave={() => handleClosePopUp('other')}
                            >
                              {!isEmpty(teachers) &&
                                teachers.map((teacher) => (
                                  <div
                                    key={teacher.employeeId}
                                    className='mb-3 teacher'
                                    onClick={() => handleAdd(teacher, 'addScoreTeacher')}
                                  >
                                    {teacher.name}
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                      </Row>
                      {!isEmpty(scoreTeachers) &&
                        scoreTeachers.map((Teacher, index) => (
                          <div key={index} className='d-flex justify-content-between show-teacher'>
                            <i className='fa fa-user' aria-hidden='true'></i>
                            <div>{Teacher.name}</div>
                          </div>
                        ))}
                    </div>
                  </div>
                  {/* --- right-col-3 */}
                  {state && (
                    <div className='mb-3'>
                      <div>
                        <h3 className='fs-4 fw-ld mbbo-0 ms-4'>LỊCH SỬ HOẠT ĐỘNG</h3>
                      </div>
                      <div className='mt-5'>
                        <Row className='mb-3'>
                          <div className='d-flex justify-content-center align-items-center form-group'>
                            <label className='form-label required'>Hình thức thi </label>

                            <Col className='ms-5'>
                              <h3>đã sửa ......</h3>
                            </Col>
                          </div>
                        </Row>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  )
}

export default ExaminationForm
