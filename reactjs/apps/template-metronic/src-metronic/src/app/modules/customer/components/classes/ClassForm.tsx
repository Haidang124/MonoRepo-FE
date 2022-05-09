import {Field, Form, Formik} from 'formik'
import moment from 'moment'
import React, {useEffect, useState} from 'react'
import {Button, Col, Row} from 'react-bootstrap'
import SVG from 'react-inlinesvg'
import {shallowEqual, useSelector} from 'react-redux'
import {useLocation, useNavigate} from 'react-router-dom'
import Select from 'react-select'
import {toast} from 'react-toastify'
import * as Yup from 'yup'
import {RootState} from '../../../../../setup'
import {toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {styleSelectBox} from '../../../admin/components/common/styles/StyleSelectBox'
import {getAllClassrooms} from '../../../admin/redux/ClassroomCRUD'
import {getAllCourses} from '../../../admin/redux/CourseCRUD'
import {UserModel} from '../../../auth/models/UserModel'
import {DayofWeek} from '../../../employee/modal/EmployeeModal'
import {ClassSchedule, ClassStatus, initClassScheduleValue} from '../../models/ClassModel'
import {createClass, getClassById, updateClass} from '../../redux/ClassCRUD'
import {getAllManager} from '../../redux/ClassManagerCRUD'
import {getAllTeacher} from '../../redux/TeacherCRUD'
import './styles/style.scss'

const ClassForm: React.FC = () => {
  const user = useSelector<RootState, UserModel>(({auth}) => auth.user as UserModel, shallowEqual)
  const navigate = useNavigate()
  const location = useLocation() as any
  const {isCreate, data} = location.state
  const [initialValues, setInitialValues] = useState(data)
  const [courses, setCourses] = useState<any>([])
  const [classrooms, setClassrooms] = useState<any>([])
  const [teachers, setTeachers] = useState<any>([])
  const [classManagers, setClassManagers] = useState<any>([])
  const [courseValue, setCourseValue] = useState<any>()
  const [managers, setManagers] = useState<any>([])
  const [schedules, setSchedules] = useState<Array<ClassSchedule>>([])
  const handleChangeSchedule = (index: number, item: any, isTeacher: boolean) => {
    let array = [...schedules]
    let newItem = {...item}
    if (isTeacher) {
      newItem = {
        ...newItem,
        teachers: [
          ...item.teachers,
          {
            employeeId: '',
            id: '',
          },
        ],
      }
    } else {
      newItem = {
        ...newItem,
        tutors: [
          ...item.tutors,
          {
            employeeId: '',
            id: '',
          },
        ],
      }
    }
    array[index] = newItem
    setSchedules(array)
  }
  const ClassSchema = Yup.object().shape({
    className: Yup.string().required('Nhập tên lớp học'),
    numberOfLessons: Yup.string().required('Nhập số buổi học'),
    duration: Yup.string().required('Nhập thời lượng học'),
    trialNumberOfLessons: Yup.string().required('Nhập số buổi học thử'),
    classStatus: Yup.string().required('Nhập trạng thái'),
    startDate: Yup.string().required('Nhập thời gian bắt đầu'),
    endDate: Yup.string().required('Nhập thời gian kết thúc'),
    // schoolDay:
    //   schedules.length > 0 ? Yup.string().required('Chọn ngày học') : Yup.string().nullable(true),
    // classroom:
    //   schedules.length > 0 ? Yup.string().required('Chọn phòng học') : Yup.string().nullable(true),
    // startTime:
    //   schedules.length > 0 ? Yup.string().required('Chọn giờ học') : Yup.string().nullable(true),
  })
  useEffect(() => {
    getAllTeacher(user.id).then((res) => {
      setTeachers(res.data.data)
    })
    getAllManager(user.id).then((res) => {
      setClassManagers(res.data.data)
    })
    getAllClassrooms().then((res) => {
      setClassrooms(res.data.data)
    })
    getAllCourses('').then((res) => {
      setCourses(res.data.data)
      setCourseValue(res.data.data.find((item: any) => item.id === data.courseId))
    })
    if (!isCreate) {
      getClassById(data.id).then((res: any) => {
        setInitialValues(res.data.data)
        setSchedules(res.data.data.classSchedules)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleSubmit = (values: any) => {
    let newData = {
      ...values,
      courseId: courseValue?.id,
      managers: managers,
      classSchedules: schedules,
      note: values.note ? values.note : '',
    }
    if (isCreate) {
      createClass(newData).then((res) => {
        toast.success('Thành công')
      })
    } else {
      updateClass(initialValues.id, newData).then((res) => {
        toast.success('Thành công')
      })
    }
  }
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        ...initialValues,
        endDate: moment(data.endDate).format('YYYY-MM-DD'),
        startDate: moment(data.startDate).format('YYYY-MM-DD'),
      }}
      validationSchema={ClassSchema}
      onSubmit={handleSubmit}
    >
      {({values, errors, touched, setFieldValue}) => (
        <Form className='class-form'>
          <Row>
            <Row>
              <Col className='col-xl-8 col-12'>
                <div className='card'>
                  <div className='card-body form-detail'>
                    <div className='d-flex justify-content-center'>
                      <h3>{isCreate ? 'TẠO LỚP HỌC MỚI' : 'THÔNG TIN LỚP HỌC'}</h3>
                    </div>
                    <div className='class-form-content'>
                      <div className='accordion accordion-icon-toggle' id='kt_accordion_3'>
                        <div
                          className='accordion-header py-3 d-flex'
                          data-bs-toggle='collapse'
                          data-bs-target='#kt_accordion_3_item_1'
                        >
                          <span className='accordion-icon'>
                            <span className='svg-icon svg-icon-4'>
                              <SVG src={toAbsoluteUrl('/media/icons/duotune/arrows/arr064.svg')} />
                            </span>
                          </span>
                          <h3 className='fs-4 fw-bold mb-0 ms-4'>THÔNG TIN LỚP HỌC</h3>
                        </div>
                        <div className='accordion-body collapse show' id='kt_accordion_3_item_1'>
                          <Row className='mb-3'>
                            <Col>
                              <div className='d-flex justify-content-center align-items-start form-group'>
                                <label className='form-label mt-3 required'>Tên lớp học</label>
                                <Col>
                                  <Field
                                    type='text'
                                    className='form-control'
                                    placeholder='Nhập tên lớp học'
                                    name='className'
                                  />
                                  {errors.className && (
                                    <div className='text-error'>{errors.className}</div>
                                  )}
                                </Col>
                              </div>
                            </Col>
                          </Row>
                          <Row className='mb-3'>
                            <Col>
                              <div className='d-flex justify-content-start align-items-start form-group'>
                                <label className='form-label mt-4'>Khóa học</label>
                                <Col>
                                  <Select
                                    styles={styleSelectBox}
                                    className='basic-select w-100'
                                    options={courses}
                                    value={courseValue}
                                    getOptionLabel={(option: any) => option.courseName}
                                    getOptionValue={(option: any) => option.id}
                                    onChange={(e) => {
                                      setCourseValue(e)
                                    }}
                                  />
                                </Col>
                              </div>
                            </Col>
                            <Col>
                              <div className='d-flex justify-content-center align-items-start form-group'>
                                <label className='form-label mt-4'>
                                  Tỷ lệ giáo viên nước ngoài
                                </label>
                                <Col>
                                  <Field
                                    type='text'
                                    className='form-control'
                                    name='foreignTeacherRate'
                                  />
                                </Col>
                                <span className='mx-2 mt-4'>%</span>
                              </div>
                            </Col>
                          </Row>
                          <Row className='mb-3'>
                            <Col>
                              <div className='d-flex justify-content-center align-items-start form-group'>
                                <label className='form-label mt-3 required'>Số buổi học</label>
                                <Col>
                                  <Field
                                    type='text'
                                    className='form-control'
                                    placeholder='Nhập số buổi học'
                                    name='numberOfLessons'
                                  />
                                  {errors.numberOfLessons && (
                                    <div className='text-error'>{errors.numberOfLessons}</div>
                                  )}
                                </Col>
                              </div>
                            </Col>
                            <Col>
                              <div className='d-flex justify-content-center align-items-start form-group'>
                                <label className='form-label mt-3 required'>
                                  Thời lượng (phút)
                                </label>
                                <Col>
                                  <Field
                                    type='text'
                                    className='form-control'
                                    placeholder='Nhập thời lượng học'
                                    name='duration'
                                  />
                                  {errors.duration && (
                                    <div className='text-error'>{errors.duration}</div>
                                  )}
                                </Col>
                              </div>
                            </Col>
                          </Row>
                          <Row className='mb-3'>
                            <Col>
                              <div className='d-flex justify-content-center align-items-center form-group'>
                                <label className='form-label'>Mô tả</label>
                                <Col>
                                  <Field
                                    type='text'
                                    as='textarea'
                                    className='form-control'
                                    placeholder='Nhập mô tả'
                                    name='note'
                                  />
                                </Col>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </div>
                      <div className='accordion accordion-icon-toggle' id='kt_accordion_3'>
                        <div
                          className='accordion-header py-3 d-flex'
                          data-bs-toggle='collapse'
                          data-bs-target='#kt_accordion_3_item_2'
                        >
                          <span className='accordion-icon'>
                            <span className='svg-icon svg-icon-4'>
                              <SVG src={toAbsoluteUrl('/media/icons/duotune/arrows/arr064.svg')} />
                            </span>
                          </span>
                          <h3 className='fs-4 fw-bold mb-0 ms-4'>THÔNG TIN THỜI GIAN</h3>
                        </div>
                        <div className='accordion-body collapse show' id='kt_accordion_3_item_2'>
                          <Row className='mb-3'>
                            <Col>
                              <div className='d-flex justify-content-center align-items-start form-group'>
                                <label className='form-label mt-3 required'>Ngày bắt đầu</label>
                                <Col>
                                  <Field type='date' className='form-control' name='startDate' />
                                  {errors.startDate && (
                                    <div className='text-error'>{errors.startDate}</div>
                                  )}
                                </Col>
                              </div>
                            </Col>
                            <Col>
                              <div className='d-flex justify-content-center align-items-start form-group'>
                                <label className='form-label mt-3 required'>Ngày kết thúc</label>
                                <Col>
                                  <Field type='date' className='form-control' name='endDate' />
                                  {errors.endDate && (
                                    <div className='text-error'>{errors.endDate}</div>
                                  )}
                                </Col>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </div>
                      <div className='accordion accordion-icon-toggle' id='kt_accordion_3'>
                        <div className='d-flex justify-content-between align-items-center'>
                          <div
                            className='accordion-header py-3 d-flex col-6'
                            data-bs-toggle='collapse'
                            data-bs-target='#kt_accordion_3_item_3'
                          >
                            <span className='accordion-icon'>
                              <span className='svg-icon svg-icon-4'>
                                <SVG
                                  src={toAbsoluteUrl('/media/icons/duotune/arrows/arr064.svg')}
                                />
                              </span>
                            </span>
                            <h3 className='fs-4 fw-bold mb-0 ms-4 col-10'>THÔNG TIN LỊCH HỌC</h3>
                          </div>
                          <div className='btn-add'>
                            <i
                              className='fa fa-plus'
                              aria-hidden='true'
                              onClick={() => setSchedules([...schedules, initClassScheduleValue])}
                            ></i>
                          </div>
                        </div>
                        {schedules.map((item: any, index: any) => (
                          <div className='accordion-body collapse show' id='kt_accordion_3_item_3'>
                            <Row className='mb-3 justify-content-center align-items-center'>
                              <div className='btn-remove-schedule'>
                                <i
                                  className='fa fa-times'
                                  aria-hidden='true'
                                  onClick={() => {
                                    var array = [...schedules]
                                    array.splice(index, 1)
                                    setSchedules(array)
                                  }}
                                ></i>
                              </div>
                              <Col>
                                <div className='d-flex justify-content-start align-items-start form-group'>
                                  <label className='form-label mt-4 required'>Ngày học</label>
                                  <Col>
                                    <Select
                                      styles={styleSelectBox}
                                      className='basic-select w-100'
                                      options={DayofWeek}
                                      defaultValue={DayofWeek.find(
                                        (ele: any) => ele.value === item.dayOfWeek
                                      )}
                                      onChange={(e) => {
                                        var array = [...schedules]
                                        array[index].dayOfWeek = e?.value as number
                                        setSchedules(array)
                                        // setFieldValue('schoolDay', e?.value)
                                      }}
                                    />
                                    {/* {errors.schoolDay && (
                                      <div className='text-error'>{errors.schoolDay}</div>
                                    )} */}
                                  </Col>
                                </div>
                              </Col>
                              <Col>
                                <div className='d-flex justify-content-center align-items-start form-group'>
                                  <label className='form-label required mt-4'>Giờ học</label>
                                  <Col>
                                    <Field
                                      type='time'
                                      className='form-control'
                                      value={item.startTime}
                                      onChange={(e: any) => {
                                        var array = [...schedules]
                                        array[index].startTime = e?.target.value as string
                                        setSchedules(array)
                                      }}
                                    />
                                    {/* {errors.startTime && (
                                      <div className='text-error'>{errors.startTime}</div>
                                    )} */}
                                  </Col>
                                </div>
                              </Col>
                              <Col>
                                <div className='d-flex justify-content-start align-items-start form-group'>
                                  <label className='form-label required mt-4'>Phòng học</label>
                                  <Col>
                                    <Select
                                      styles={styleSelectBox}
                                      className='basic-select w-100'
                                      options={classrooms}
                                      getOptionLabel={(option: any) => option.name}
                                      getOptionValue={(option: any) => option.id}
                                      defaultValue={classrooms.find(
                                        (ele: any) => ele.id === item.classroomId
                                      )}
                                      onChange={(e) => {
                                        var array = [...schedules]
                                        array[index].classroomId = e?.id as string
                                        setSchedules(array)
                                      }}
                                    />
                                    {/* {errors.classroom && (
                                      <div className='text-error'>{errors.classroom}</div>
                                    )} */}
                                  </Col>
                                </div>
                              </Col>
                            </Row>
                            <Row className='d-flex justify-content-center align-items-start'>
                              <div className='info-teacher col-6'>
                                <div className='d-flex justify-content-between align-items-center px-5'>
                                  <h6>Giáo viên</h6>
                                  <i
                                    className='fa fa-plus '
                                    aria-hidden='true'
                                    onClick={() => handleChangeSchedule(index, item, true)}
                                  ></i>
                                </div>
                                {item.teachers.map((value: any, i: any) => (
                                  <div className='mb-4'>
                                    <Row className='d-flex justify-content-between align-items-center'>
                                      <Col className='col-1'>
                                        <i
                                          className='fa fa-times'
                                          aria-hidden='true'
                                          onClick={() => {
                                            var array = [...schedules]
                                            array[index].teachers.splice(i, 1)
                                            setSchedules(array)
                                          }}
                                        ></i>
                                      </Col>
                                      <Col>
                                        <div className='d-flex align-items-center form-group'>
                                          <Col>
                                            <div className='d-flex align-items-center form-group'>
                                              <label className='form-label min-w-25px p-0 mt-4 mx-4'>
                                                Chọn giáo viên
                                              </label>
                                              <Col>
                                                <Select
                                                  styles={styleSelectBox}
                                                  className='basic-select w-100'
                                                  options={teachers}
                                                  value={teachers.find(
                                                    (item: any) => item.id === value.employeeId
                                                  )}
                                                  getOptionLabel={(option: any) =>
                                                    option.user.username
                                                  }
                                                  getOptionValue={(option: any) => option.user.id}
                                                  onChange={(e) => {
                                                    var array = [...schedules]
                                                    value.employeeId = e?.id
                                                    setSchedules(array)
                                                  }}
                                                />
                                              </Col>
                                            </div>
                                          </Col>
                                        </div>
                                      </Col>
                                    </Row>
                                  </div>
                                ))}
                              </div>
                              <div className='info-assistant-teacher col-6'>
                                <div className='d-flex justify-content-between align-items-center px-5'>
                                  <h6>Trợ giảng</h6>
                                  <i
                                    className='fa fa-plus '
                                    aria-hidden='true'
                                    onClick={() => handleChangeSchedule(index, item, false)}
                                  ></i>
                                </div>
                                {item.tutors.map((value: any, index: any) => (
                                  <div className='mb-4'>
                                    <Row className='d-flex justify-content-between align-items-center'>
                                      <Col className='col-1'>
                                        <i
                                          className='fa fa-times'
                                          aria-hidden='true'
                                          onClick={() => {
                                            var array = [...schedules]
                                            array[index].tutors.splice(index, 1)
                                            setSchedules(array)
                                          }}
                                        ></i>
                                      </Col>
                                      <Col>
                                        <div className='d-flex align-items-center form-group'>
                                          <Col>
                                            <div className='d-flex align-items-center form-group'>
                                              <label className='form-label min-w-25px p-0 mt-4 mx-4'>
                                                Chọn trợ giảng
                                              </label>
                                              <Col>
                                                <Select
                                                  styles={styleSelectBox}
                                                  className='basic-select w-100'
                                                  options={teachers}
                                                  value={teachers.find(
                                                    (item: any) => item.id === value.employeeId
                                                  )}
                                                  getOptionLabel={(option: any) =>
                                                    option.user.username
                                                  }
                                                  getOptionValue={(option: any) => option.user.id}
                                                  onChange={(e) => {
                                                    var array = [...schedules]
                                                    value.employeeId = e?.id
                                                    setSchedules(array)
                                                  }}
                                                />
                                              </Col>
                                            </div>
                                          </Col>
                                        </div>
                                      </Col>
                                    </Row>
                                  </div>
                                ))}
                              </div>
                            </Row>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className='footer d-flex justify-content-end'>
                      <Button className='btn btn-secondary mx-4' onClick={() => navigate(-1)}>
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
                <div className='card'>
                  <div className='card-body'>
                    <div className='right-info'>
                      <div className='d-flex justify-content-center'>
                        <h3>THÔNG TIN CHI TIẾT</h3>
                      </div>
                      <div className='mt-5'>
                        <Row className='mb-3'>
                          <Col>
                            <div className='d-flex align-items-start form-group'>
                              <label className='form-label mt-4 required'>Trạng thái</label>
                              <Col>
                                <Select
                                  styles={styleSelectBox}
                                  className='basic-select w-100'
                                  options={ClassStatus}
                                  defaultValue={ClassStatus.find(
                                    (item: any) => item.value === initialValues?.classStatus
                                  )}
                                  onChange={(e) => {
                                    setFieldValue('classStatus', e?.value)
                                  }}
                                />
                                {errors.classStatus && (
                                  <div className='text-error'>{errors.classStatus}</div>
                                )}
                              </Col>
                            </div>
                          </Col>
                        </Row>
                        <Row className='mb-3'>
                          <Col>
                            <div className='d-flex align-items-start form-group'>
                              <label className='form-label mt-4 required'>
                                Số buổi học thử cho phép
                              </label>
                              <Col>
                                <Field
                                  type='text'
                                  className='form-control'
                                  name='trialNumberOfLessons'
                                />
                                {errors.trialNumberOfLessons && (
                                  <div className='text-error'>{errors.trialNumberOfLessons}</div>
                                )}
                              </Col>
                            </div>
                          </Col>
                        </Row>
                        <div className='my-5 d-flex align-items-center justify-content-between'>
                          <h3> Quản lý lớp</h3>
                          <div className='btn-add'>
                            <i
                              className='fa fa-plus'
                              aria-hidden='true'
                              onClick={() => setManagers([...managers, {employeeId: ''}])}
                            ></i>
                          </div>
                        </div>
                        {managers.map((value: any, index: any) => (
                          <div className='mb-4'>
                            <Row className='d-flex justify-content-between align-items-center'>
                              <Col className='col-1'>
                                <i
                                  className='fa fa-times'
                                  aria-hidden='true'
                                  onClick={() => {
                                    var array = [...managers]
                                    array.splice(index, 1)
                                    setManagers(array)
                                  }}
                                ></i>
                              </Col>
                              <Col>
                                <div className='d-flex align-items-center form-group'>
                                  <Col>
                                    <div className='d-flex align-items-center form-group'>
                                      <label className='form-label min-w-25px p-0 mt-4 mx-4'>
                                        Người quản lý
                                      </label>
                                      <Col>
                                        <Select
                                          styles={styleSelectBox}
                                          className='basic-select w-100'
                                          options={classManagers}
                                          getOptionLabel={(option: any) => option.user.username}
                                          getOptionValue={(option: any) => option.user.id}
                                          onChange={(e) => {
                                            var array = [...managers]
                                            array[index].employeeId = e?.id
                                            setManagers(array)
                                          }}
                                        />
                                      </Col>
                                    </div>
                                  </Col>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        ))}
                        {!isCreate && (
                          <>
                            <Row>
                              <div className='history-action pt-3'>
                                <h3 className='py-4'>LỊCH SỬ HOẠT ĐỘNG</h3>
                                <div className='history-main'>
                                  <img
                                    src='https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'
                                    alt=''
                                  />
                                  <div className='history-detail'>
                                    <div>
                                      <span className='user-action fs-5 fw-bolder text-gray-900 text-hover-primary mb-2'>
                                        {user.username}
                                      </span>
                                      <span className='time-action fw-bold text-gray-400 mx-4'>
                                        15 giờ trước
                                      </span>
                                    </div>
                                    <span className='action-detail fw-bold text-gray-400'>
                                      đã tạo thay đổi thông tin số điện thoại
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </Row>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Row>
        </Form>
      )}
    </Formik>
  )
}
export default ClassForm
