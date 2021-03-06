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
      toast.success('Th??m m???i th??nh c??ng')
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
                    <h3>Thi???t L???p</h3>
                  </div>
                  <div className='edit-slary-form-main mt-5'>
                    <div className='info-salary-region px'>
                      <h3 className='required'>TH??NG TIN M???C L????NG T???I THI???U THEO V??NG</h3>
                      <div className='info-salary-region-content mt-4 p-4'>
                        <Row className='mb-3 '>
                          <Col>
                            <div className='d-flex justify-content-start align-items-center form-group'>
                              <label className='form-label mt-2 required'>
                                M???c l????ng t???i thi???u
                              </label>
                              <Field type='text' className='form-control' name='minSalary' />
                            </div>
                          </Col>
                          <Col>
                            <div className='d-flex justify-content-center align-items-center form-group'>
                              <label className='form-label required'>N??m ??p d???ng</label>
                              <Col>
                                <Field
                                  type='text'
                                  className='form-control'
                                  placeholder='Nh???p t??n ph??ng ban'
                                  name='year'
                                />
                              </Col>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                    <div className='rate-salary-overtime mt-4'>
                      <h3 className='required'>T??? L??? H?????NG L????NG L??M TH??M</h3>
                      <div className='rate-salary-overtime-content p-4'>
                        <Row className='mb-3'>
                          <Col>
                            <div className='d-flex justify-content-center align-items-center form-group'>
                              <label className='form-label'>L??m th??m ng??y th?????ng</label>
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
                              <label className='form-label'>L??m th??m ng??y ngh??? (?????nh k???)</label>
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
                              <label className='form-label'>L??m th??m ng??y l???, t???t</label>
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
                      <h3 className='required'>T??? L??? ????NG B???O HI???M</h3>
                      <div className='rate-salary-insurance-content p-4'>
                        <div className='rate-company'>
                          <div className='d-flex justify-content-center align-items-center'>
                            <h5>T??? l??? c??ng ty ph???i ????ng</h5>
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
                            <h5>T??? l??? nh??n vi??n ph???i ????ng</h5>
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
                      H???y b???
                    </Button>
                    <Button className='btn btn-primary' type='submit'>
                      Ho??n t???t
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
                      <h3>TH???I GIAN ??P D???NG</h3>
                    </div>
                    <div className='mt-5'>
                      <Row className='mb-3'>
                        <Col>
                          <div className='d-flex align-items-start form-group'>
                            <label className='form-label mt-4 required'>T??? ng??y</label>
                            <Col>
                              <Field type='date' className='form-control' name='fromDate' />
                            </Col>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <div className='d-flex align-items-start form-group'>
                            <label className='form-label mt-4 required'>?????n ng??y</label>
                            <Col>
                              <Field type='date' className='form-control' name='toDate' />
                            </Col>
                          </div>
                        </Col>
                      </Row>
                      <div className='my-5 d-flex align-items-center justify-content-between'>
                        <h3> NG??Y NGH??? TRONG TU???N</h3>
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
                                <label className='form-label min-w-25px p-0 mt-4 mx-4'>Th???</label>
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
                                <label className='form-label min-w-25px mt-4'>N???a ng??y</label>
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
                        <h3> NG??Y NGH??? L??? TRONG N??M</h3>
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
                                <label className='form-label mt-4'>T??n k??? ngh??? l???</label>
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
                                <label className='form-label mt-4'>B???t ?????u</label>
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
                                <label className='form-label mt-4'>K???t th??c</label>
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
