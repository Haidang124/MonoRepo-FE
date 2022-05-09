import {Field, Form, Formik} from 'formik'
import React from 'react'
import {Button, Col, Row} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import Select from 'react-select'
import {toast} from 'react-toastify'
import * as Yup from 'yup'
import {DayOfWeek, WelfareType} from '../../models/SalaryModel'
import {createSalary} from '../../redux/SalaryCRUD'
import {styleSelectBox} from '../common/styles/StyleSelectBox'
import {initSalary} from './SalaryGradeContext'
import './styles/salaryForm.scss'
const SalaryForm: React.FC = () => {
  const initDayOfWeek = {
    dayOfWeek: 0,
    isHalfDay: false,
  }
  const initDayofYear = {
    name: '',
    fromDate: '',
    toDate: '',
  }
  const SalaryGradeSchema = Yup.object().shape({})
  const navigate = useNavigate()
  const [dayOffInWeeks, setDayOffInWeeks] = React.useState<any>([])
  const [dayOffInYears, setDayOffInYears] = React.useState<any>([])
  const [welfareTypes, setWelfareTypes] = React.useState<any>([])
  const addNewDayOff = (value: any, isWeek: boolean) => {
    if (isWeek) {
      setDayOffInWeeks([...dayOffInWeeks, value])
    } else {
      setDayOffInYears([...dayOffInYears, value])
    }
  }
  const updateDayOff = (value: any, index: number, isWeek: boolean) => {
    let cloneDayOff = [...(isWeek ? dayOffInWeeks : dayOffInYears)]
    cloneDayOff[index] = value
    if (isWeek) {
      setDayOffInWeeks(cloneDayOff)
    } else {
      setDayOffInYears(cloneDayOff)
    }
  }
  const handleWelfareTypeChange = (value: any, nameWelfareType: string, isCompany: boolean) => {
    let index = welfareTypes.findIndex((welfare: any) => welfare.name === nameWelfareType)
    if (index !== -1) {
      let cloneWelfareTypes = [...welfareTypes]
      cloneWelfareTypes[index] = isCompany
        ? {
            ...cloneWelfareTypes[index],
            companyPayRate: value,
          }
        : {
            ...cloneWelfareTypes[index],
            employeePayRate: value,
          }
      setWelfareTypes(cloneWelfareTypes)
    } else {
      setWelfareTypes([
        ...welfareTypes,
        {
          name: nameWelfareType,
          companyPayRate: isCompany ? value : 0,
          employeePayRate: isCompany ? 0 : value,
        },
      ])
    }
  }
  const handleSubmit = (values: any) => {
    let newData = {
      ...values,
      dayOffInWeeks: dayOffInWeeks,
      dayOffInYears: dayOffInYears,
      welfareTypes: welfareTypes,
    }
    createSalary(newData).then(() => {
      toast.success('Thêm mới thành công')
    })
  }
  const removeByIndex = (index: number, isWeek: boolean) => {
    var array = isWeek ? [...dayOffInWeeks] : [...dayOffInYears]
    if (index !== -1) {
      array.splice(index, 1)
      isWeek ? setDayOffInWeeks(array) : setDayOffInYears(array)
    }
  }
  return (
    <Formik
      enableReinitialize={true}
      initialValues={initSalary}
      validationSchema={SalaryGradeSchema}
      onSubmit={handleSubmit}
    >
      {({values, errors, touched, setFieldValue}) => (
        <Form className='salary-form'>
          <Row>
            <Col className='col-xl-8 col-12'>
              <div className='card'>
                <div className='card-body form-detail'>
                  <div className='d-flex justify-content-center'>
                    <h3>Thiết Lập</h3>
                  </div>
                  <div className='edit-slary-form-main mt-5'>
                    <div className='info-salary-region px'>
                      <h3 className='required'>THÔNG TIN MỨC LƯƠNG TỐI THIỂU THEO VÙNG</h3>
                      <div className='info-salary-region-content mt-4 p-4'>
                        <Row className='mb-3 '>
                          <Col>
                            <div className='d-flex justify-content-start align-items-center form-group'>
                              <label className='form-label mt-2 required'>
                                Mức lương tối thiểu
                              </label>
                              <Field type='text' className='form-control' name='minSalary' />
                            </div>
                          </Col>
                          <Col>
                            <div className='d-flex justify-content-center align-items-center form-group'>
                              <label className='form-label required'>Năm áp dụng</label>
                              <Col>
                                <Field
                                  type='text'
                                  className='form-control'
                                  placeholder='Nhập tên phòng ban'
                                  name='year'
                                />
                              </Col>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                    <div className='rate-salary-overtime mt-4'>
                      <h3 className='required'>TỶ LỆ HƯỞNG LƯƠNG LÀM THÊM</h3>
                      <div className='rate-salary-overtime-content p-4'>
                        <Row className='mb-3'>
                          <Col>
                            <div className='d-flex justify-content-center align-items-center form-group'>
                              <label className='form-label'>Làm thêm ngày thường</label>
                              <Col>
                                <Field
                                  type='text'
                                  className='form-control'
                                  name='overtimeDayNormal'
                                />
                              </Col>
                              <span className='mx-2'>%</span>
                            </div>
                          </Col>
                          <Col>
                            <div className='d-flex justify-content-center align-items-center form-group'>
                              <label className='form-label'>Làm thêm ngày nghỉ (định kỳ)</label>
                              <Col>
                                <Field type='text' className='form-control' name='overtimeDayOff' />
                              </Col>
                              <span className='mx-2'>%</span>
                            </div>
                          </Col>
                        </Row>
                        <Row className='mb-3'>
                          <Col>
                            <div className='d-flex justify-content-center align-items-center form-group'>
                              <label className='form-label'>Làm thêm ngày lễ, tết</label>
                              <Col>
                                <Field
                                  type='text'
                                  className='form-control'
                                  name='overtimeDaySpecial'
                                />
                              </Col>
                              <span className='mx-2'>%</span>
                            </div>
                          </Col>
                          <Col></Col>
                        </Row>
                      </div>
                    </div>
                    <div className='rate-salary-insurance mt-4'>
                      <h3 className='required'>TỶ LỆ ĐÓNG BẢO HIỂM</h3>
                      <div className='rate-salary-insurance-content p-4'>
                        <div className='rate-company'>
                          <div className='d-flex justify-content-center align-items-center'>
                            <h5>Tỷ lệ công ty phải đóng</h5>
                          </div>
                          <div className='rate-number mt-4'>
                            {WelfareType.map((item, index) => (
                              <Row className='mb-3'>
                                <Col>
                                  <div className='d-flex justify-content-center align-items-center form-group'>
                                    <label className='form-label'>{item.label}</label>
                                    <Col>
                                      <Field
                                        type='text'
                                        className='form-control'
                                        name={item.name}
                                        onChange={(e: any) =>
                                          handleWelfareTypeChange(e.target.value, item.name, true)
                                        }
                                      />
                                    </Col>
                                    <span className='mx-2'>%</span>
                                  </div>
                                </Col>
                              </Row>
                            ))}
                          </div>
                        </div>
                        <div className='rate-employee'>
                          <div className='d-flex justify-content-center align-items-center'>
                            <h5>Tỷ lệ nhân viên phải đóng</h5>
                          </div>
                          <div className='rate-number mt-4'>
                            {WelfareType.map((item, index) => (
                              <Row className='mb-3'>
                                <Col>
                                  <div className='d-flex justify-content-center align-items-center form-group'>
                                    <label className='form-label'>{item.label}</label>
                                    <Col>
                                      <Field
                                        type='text'
                                        className='form-control'
                                        name={item.name}
                                        onChange={(e: any) =>
                                          handleWelfareTypeChange(e.target.value, item.name, false)
                                        }
                                      />
                                    </Col>
                                    <span className='mx-2'>%</span>
                                  </div>
                                </Col>
                              </Row>
                            ))}
                          </div>
                        </div>
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
                      <h3>THỜI GIAN ÁP DỤNG</h3>
                    </div>
                    <div className='mt-5'>
                      <Row className='mb-3'>
                        <Col>
                          <div className='d-flex align-items-start form-group'>
                            <label className='form-label mt-4 required'>Từ ngày</label>
                            <Col>
                              <Field type='date' className='form-control' name='fromDate' />
                            </Col>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <div className='d-flex align-items-start form-group'>
                            <label className='form-label mt-4 required'>Đến ngày</label>
                            <Col>
                              <Field type='date' className='form-control' name='toDate' />
                            </Col>
                          </div>
                        </Col>
                      </Row>
                      <div className='my-5 d-flex align-items-center justify-content-between'>
                        <h3> NGÀY NGHỈ TRONG TUẦN</h3>
                        <div className='btn-add'>
                          <i
                            className='fa fa-plus'
                            aria-hidden='true'
                            onClick={() => addNewDayOff(initDayOfWeek, true)}
                          ></i>
                        </div>
                      </div>
                      {dayOffInWeeks.map((value: any, index: any) => (
                        <div className='mb-4'>
                          <Row className='d-flex justify-content-between align-items-center'>
                            <Col className='col-1'>
                              <i
                                className='fa fa-times'
                                aria-hidden='true'
                                onClick={() => removeByIndex(index, true)}
                              ></i>
                            </Col>
                            <Col className='col-7'>
                              <div className='d-flex align-items-center form-group'>
                                <label className='form-label min-w-25px p-0 mt-4 mx-4'>Thứ</label>
                                <Col>
                                  <Select
                                    styles={styleSelectBox}
                                    className='basic-select w-100'
                                    options={DayOfWeek}
                                    defaultValue={DayOfWeek.find(
                                      (item) => item.value === value?.dayOfWeek
                                    )}
                                    onChange={(e) => {
                                      updateDayOff({...value, dayOfWeek: e?.value}, index, true)
                                    }}
                                  />
                                </Col>
                              </div>
                            </Col>
                            <Col className='col-4'>
                              <div className='d-flex align-items-center justify-content-end form-group'>
                                <label className='form-label min-w-25px mt-4'>Nửa ngày</label>
                                <input
                                  className='form-check-input mt-1'
                                  type='checkbox'
                                  id='flexCheckDefault'
                                  defaultChecked={value?.isHalfDay}
                                  onChange={(e) => {
                                    updateDayOff(
                                      {...value, isHalfDay: e?.target.checked},
                                      index,
                                      true
                                    )
                                  }}
                                />
                              </div>
                            </Col>
                          </Row>
                        </div>
                      ))}
                      <div className='my-5 d-flex align-items-center justify-content-between'>
                        <h3> NGÀY NGHỈ LỄ TRONG NĂM</h3>
                        <div className='btn-add'>
                          <i
                            className='fa fa-plus'
                            aria-hidden='true'
                            onClick={() => addNewDayOff(initDayofYear, false)}
                          ></i>
                        </div>
                      </div>
                      {dayOffInYears.map((value: any, index: any) => (
                        <div className='mb-4'>
                          <i
                            className='fa fa-times'
                            aria-hidden='true'
                            onClick={() => removeByIndex(index, false)}
                          ></i>
                          <Row className='mb-3'>
                            <Col>
                              <div className='d-flex align-items-center form-group'>
                                <label className='form-label mt-4'>Tên kỳ nghỉ lễ</label>
                                <Col>
                                  <Field
                                    type='text'
                                    className='form-control'
                                    value={value?.name}
                                    onChange={(e: any) => {
                                      updateDayOff({...value, name: e.target.value}, index, false)
                                    }}
                                  />
                                </Col>
                              </div>
                            </Col>
                          </Row>
                          <Row className='mb-3'>
                            <Col>
                              <div className='d-flex align-items-center form-group'>
                                <label className='form-label mt-4'>Bắt đầu</label>
                                <Col>
                                  <Field
                                    type='Date'
                                    className='form-control'
                                    value={value?.fromDate}
                                    onChange={(e: any) => {
                                      updateDayOff(
                                        {...value, fromDate: e.target.value},
                                        index,
                                        false
                                      )
                                    }}
                                  />
                                </Col>
                              </div>
                            </Col>
                          </Row>
                          <Row className='mb-3'>
                            <Col>
                              <div className='d-flex align-items-center form-group'>
                                <label className='form-label mt-4'>Kết thúc</label>
                                <Col>
                                  <Field
                                    type='Date'
                                    className='form-control'
                                    value={value?.toDate}
                                    onChange={(e: any) => {
                                      updateDayOff({...value, toDate: e.target.value}, index, false)
                                    }}
                                  />
                                </Col>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      ))}
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
export default SalaryForm
