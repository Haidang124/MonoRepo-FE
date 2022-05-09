import {Field, Form, Formik} from 'formik'
import React, {useEffect, useState} from 'react'
import {Button, Col, Row} from 'react-bootstrap'
import {useLocation, useNavigate} from 'react-router-dom'
import Select from 'react-select'
import {toast} from 'react-toastify'
import * as Yup from 'yup'
import {findPositions} from '../../redux/PositionCRUD'
import {getSalaryByYear} from '../../redux/SalaryCRUD'
import {
  createSalaryGrade,
  editSalaryGradesById,
  getSalaryGradesDetailById,
} from '../../redux/SalaryGradesCRUD'
import {styleSelectBox} from '../common/styles/StyleSelectBox'
import './styles/salaryGradeForm.scss'
const SalaryGradeForm: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation() as any
  const {isCreate, data} = location.state
  const [initialValues, setInitialValues] = useState(data)
  const [isMinSalary, setIsMinSalary] = useState(false)
  const [isWorkingDays, setIsWorkingDays] = useState(true)
  const [isWorkingHours, setIsWorkingHours] = useState(true)
  const [isTeachingHours, setIsTeachingHours] = useState(true)
  const [positions, setPositions] = useState([])
  const SalarySchema = Yup.object().shape({
    minSalary: isMinSalary
      ? Yup.string().required('Nhập mức lương tối thiểu')
      : Yup.string().nullable(true),
    coefficientsSalary: Yup.string().required('Nhập hệ số lương'),
    salaryIncrement: Yup.string().required('Nhập tỷ lệ tăng từng bậc'),
    dutyAllowanceRate: Yup.string().required('Nhập phụ cấp trách nhiệm'),
    otherAllowanceRate: Yup.string().required('Nhập phụ cấp khác'),
  })
  useEffect(() => {
    findPositions({name: '', page: 1, pageSize: 10}).then((res: any) => {
      setPositions(res.data.items)
    })
  }, [])
  const handleSubmit = (values: any) => {
    let newData = {...values, positionId: values.position.id}
    getSalaryByYear().then((res: any) => {
      newData = isMinSalary
        ? {...newData, salaryId: null}
        : {...newData, salaryId: res.data.data.id, minSalary: null}
      if (isCreate) {
        createSalaryGrade(newData).then((res: any) => {
          toast.success('Thành công')
        })
      } else {
        editSalaryGradesById(newData, data.id).then((res: any) => {
          toast.success('Thành công')
        })
      }
    })
  }
  useEffect(() => {
    if (!isCreate) {
      getSalaryGradesDetailById(data.id).then((res) => {
        setInitialValues(res.data.data)
        setIsWorkingDays(res.data.data.workingDays?.isActive || false)
        setIsWorkingHours(res.data.data.workingHours?.isActive || false)
        setIsTeachingHours(res.data.data.teachingHours?.isActive || false)
        setIsMinSalary(res.data.data.minSalary ? true : false)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={SalarySchema}
      onSubmit={handleSubmit}
    >
      {({values, errors, touched, setFieldValue}) => (
        <Form className='salary-grade-form'>
          <Row>
            <Col className='col-xl-8 col-12'>
              <div className='card'>
                <div className='card-body form-detail'>
                  <div className='d-flex justify-content-center'>
                    <h3>{isCreate ? 'TẠO BẬC LƯƠNG MỚI' : 'CHỈNH SỬA BẬC LƯƠNG'}</h3>
                  </div>
                  <div className='slary-form-main mt-5'>
                    <Row className='mb-3'>
                      <Col>
                        <div className='d-flex justify-content-center align-items-start form-group'>
                          <label className='form-label mt-4 required'>Chức vụ</label>
                          <Col>
                            <Select
                              styles={styleSelectBox}
                              className='basic-select w-100'
                              options={positions}
                              defaultValue={initialValues?.position}
                              getOptionLabel={(option: any) => option.name}
                              getOptionValue={(option: any) => option.id}
                              onChange={(e) => {
                                setFieldValue('position', e)
                              }}
                            />
                          </Col>
                        </div>
                      </Col>
                    </Row>
                    <div className='set-salary'>
                      <h3 className='required'>THIẾT LẬP MỨC LƯƠNG</h3>
                      <div className='set-salary-content mt-4 p-4'>
                        <Row className='mb-3 '>
                          <Col>
                            <div className='d-flex justify-content-start align-items-center form-group'>
                              <label className='form-label mt-2'>Sử dụng mức lương vùng</label>
                              <i
                                className={
                                  !isMinSalary
                                    ? 'fa fa-toggle-on fa-toggle-icon'
                                    : 'fa fa-toggle-off fa-toggle-icon'
                                }
                                onClick={() => setIsMinSalary(!isMinSalary)}
                              ></i>
                            </div>
                          </Col>
                          <Col>
                            {isMinSalary && (
                              <div className='d-flex justify-content-start align-items-start form-group'>
                                <label className='form-label mt-3 required'>
                                  Mức lương tối thiểu
                                </label>
                                <Col>
                                  <Field type='text' className='form-control' name='minSalary' />
                                  {errors.minSalary && (
                                    <div className='text-error'>{errors.minSalary}</div>
                                  )}
                                </Col>
                              </div>
                            )}
                          </Col>
                        </Row>
                      </div>
                    </div>
                    <div className='info-salary-grades mt-4'>
                      <h3 className='required'>THÔNG TIN HỆ SỐ BẬC LƯƠNG</h3>
                      <div className='info-salary-grades-content p-4'>
                        <Row className='mb-3'>
                          <Col>
                            <div className='d-flex justify-content-center align-items-start form-group'>
                              <label className='form-label mt-4 required'>Hệ số lương</label>
                              <Col>
                                <Field
                                  type='text'
                                  className='form-control'
                                  name='coefficientsSalary'
                                />
                                {errors.coefficientsSalary && (
                                  <div className='text-error'>{errors.coefficientsSalary}</div>
                                )}
                              </Col>
                              <span className='mx-2 mt-4'>%</span>
                            </div>
                          </Col>
                          <Col>
                            <div className='d-flex justify-content-center align-items-start form-group'>
                              <label className='form-label mt-4 required'>
                                Tỷ lệ tăng từng bậc
                              </label>
                              <Col>
                                <Field
                                  type='text'
                                  className='form-control'
                                  name='salaryIncrement'
                                />
                                {errors.salaryIncrement && (
                                  <div className='text-error'>{errors.salaryIncrement}</div>
                                )}
                              </Col>
                              <span className='mx-2 mt-4'>%</span>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                    <div className='calculate-salary mt-4'>
                      <h3 className='required'>HÌNH THỨC TÍNH LƯƠNG</h3>
                      <div className='calculate-salary-content pt-4'>
                        <Row className='mb-3'>
                          <div className='d-flex col-xl-3 justify-content-start align-items-center form-group'>
                            <label className='form-label mt-2'>Ngày công</label>
                            <i
                              className={
                                isWorkingDays
                                  ? 'fa fa-toggle-on fa-toggle-icon'
                                  : 'fa fa-toggle-off fa-toggle-icon'
                              }
                              onClick={() => setIsWorkingDays(!isWorkingDays)}
                            ></i>
                          </div>
                          <div className='calculate-salary-number col'>
                            {isWorkingDays && (
                              <>
                                <div className='d-flex justify-content-center align-items-center form-group'>
                                  <label className='form-label '>Số ngày công</label>
                                  <Col>
                                    <Field
                                      type='text'
                                      className='form-control'
                                      name='workingDays.workingTime'
                                    />
                                  </Col>
                                </div>
                                <div className='d-flex justify-content-center align-items-center form-group mx-3'>
                                  <label className='form-label '>
                                    Tỷ lệ tính trên lương cơ bản
                                  </label>
                                  <Col>
                                    <Field
                                      type='text'
                                      className='form-control'
                                      name='workingDays.rateBaseOnBasicSalary'
                                    />
                                  </Col>
                                  <span className='mx-2'>%</span>
                                </div>
                              </>
                            )}
                          </div>
                        </Row>
                        <Row className='mb-3'>
                          <div className='d-flex col-xl-3 justify-content-start align-items-center form-group'>
                            <label className='form-label mt-2'>Giờ làm</label>
                            <i
                              className={
                                isWorkingHours
                                  ? 'fa fa-toggle-on fa-toggle-icon'
                                  : 'fa fa-toggle-off fa-toggle-icon'
                              }
                              onClick={() => setIsWorkingHours(!isWorkingHours)}
                            ></i>
                          </div>
                          <div className='calculate-salary-number col'>
                            {isWorkingHours && (
                              <>
                                <div className='d-flex justify-content-center align-items-center form-group'>
                                  <label className='form-label '>Số giờ làm</label>
                                  <Col>
                                    <Field
                                      type='text'
                                      className='form-control'
                                      name='workingHours.workingTime'
                                    />
                                  </Col>
                                </div>
                                <div className='d-flex justify-content-center align-items-center form-group mx-3'>
                                  <label className='form-label '>
                                    Tỷ lệ tính trên lương cơ bản
                                  </label>
                                  <Col>
                                    <Field
                                      type='text'
                                      className='form-control'
                                      name='workingHours.rateBaseOnBasicSalary'
                                    />
                                  </Col>
                                  <span className='mx-2'>%</span>
                                </div>
                              </>
                            )}
                          </div>
                        </Row>
                        <Row className='mb-3'>
                          <div className='d-flex col-xl-3 justify-content-start align-items-center form-group'>
                            <label className='form-label mt-2'>Giờ dạy</label>
                            <i
                              className={
                                isTeachingHours
                                  ? 'fa fa-toggle-on fa-toggle-icon'
                                  : 'fa fa-toggle-off fa-toggle-icon'
                              }
                              onClick={() => setIsTeachingHours(!isTeachingHours)}
                            ></i>
                          </div>
                          <div className='calculate-salary-number col'>
                            {isTeachingHours && (
                              <>
                                <div className='d-flex justify-content-center align-items-center form-group'>
                                  <label className='form-label '>Số giờ dạy</label>
                                  <Col>
                                    <Field
                                      type='text'
                                      className='form-control'
                                      name='teachingHours.workingTime'
                                    />
                                  </Col>
                                </div>
                                <div className='d-flex justify-content-center align-items-center form-group mx-3'>
                                  <label className='form-label '>
                                    Tỷ lệ tính trên lương cơ bản
                                  </label>
                                  <Col>
                                    <Field
                                      type='text'
                                      className='form-control'
                                      name='teachingHours.rateBaseOnBasicSalary'
                                    />
                                  </Col>
                                  <span className='mx-2'>%</span>
                                </div>
                              </>
                            )}
                          </div>
                        </Row>
                      </div>
                    </div>
                  </div>
                  <div className='footer d-flex justify-content-end '>
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
            <Col>
              <div className='card'>
                <div className='card-body'>
                  <div className='right-info'>
                    <div className='title-section '>
                      <h3>TỶ LỆ PHỤ CẤP</h3>
                    </div>
                    <div className='mt-5'>
                      <Row className='mb-3'>
                        <Col>
                          <div className='d-flex align-items-start form-group'>
                            <label className='form-label mt-4 required'>
                              Tỷ lệ phụ cấp trách nhiệm
                            </label>
                            <Col>
                              <Field
                                type='text'
                                className='form-control'
                                name='dutyAllowanceRate'
                              />
                              {errors.dutyAllowanceRate && (
                                <div className='text-error'>{errors.dutyAllowanceRate}</div>
                              )}
                            </Col>
                          </div>
                        </Col>
                      </Row>
                      <Row className='mb-3'>
                        <Col>
                          <div className='d-flex align-items-start form-group'>
                            <label className='form-label mt-4 required'>Tỷ lệ phụ cấp khác</label>
                            <Col>
                              <Field
                                type='text'
                                className='form-control'
                                name='otherAllowanceRate'
                              />
                              {errors.otherAllowanceRate && (
                                <div className='text-error'>{errors.otherAllowanceRate}</div>
                              )}
                            </Col>
                          </div>
                        </Col>
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
export default SalaryGradeForm
