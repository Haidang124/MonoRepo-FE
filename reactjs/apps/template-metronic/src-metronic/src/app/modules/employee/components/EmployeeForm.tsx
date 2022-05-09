import {Field, Form, Formik} from 'formik'
import {isEmpty} from 'lodash'
import React, {useEffect, useState} from 'react'
import {Button, Col, Row} from 'react-bootstrap'
import SVG from 'react-inlinesvg'
import {shallowEqual, useSelector} from 'react-redux'
import {useLocation, useNavigate} from 'react-router-dom'
import Select from 'react-select'
import {toast} from 'react-toastify'
import {RootState} from '../../../../setup'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {GenderOptions, MaritalStatus, UserModel} from '../../auth/models/UserModel'
import {
  CertificateLevelOptions,
  CertificateOptions,
  DayofWeek,
  DegreeEducationOptions,
  LevelEducationsOptions,
  RelationOptions,
  SalaryLevelOptions,
  StatusOptions,
  WorkTypeOptions,
} from '../modal/EmployeeModal'
import {createEmployee, getEmployeeById, updateEmployee} from '../redux/EmployeeCRUD'
import '../style/style.scss'
import {initEmployee} from './EmployeeContext'
import moment from 'moment'
import { getPositions } from '../../admin/redux/PositionCRUD'
import { getAllTenant } from '../../admin/redux/TenantCRUD'
import { getMasterDataBanks } from '../../admin/redux/MasterDataCRUD'


const EmployeeForm: React.FC = () => {
  const {state} = useLocation()
  const [employeeData, setEmployeeData] = useState(initEmployee)
  const user = useSelector<RootState, UserModel>(({auth}) => auth.user as UserModel, shallowEqual)
  const [positionOptions, setPositionOptions] = useState([{value : '', label : ''}])
  const [tenantOptions, setTenantOptions] = useState([{value : '', label : ''}])
  const [bankOptions, setBankOptions] = useState([{value : '', label : ''}])
  useEffect(() => {
    if (state) {
      getEmployeeById(state).then((res) => {
        // console.log(res.data.data)
        
        setEmployeeData(res.data.data)
      })
    }
  }, [state,setEmployeeData])

  useEffect(() => {
    getPositions().then(res => {
      if(!isEmpty(res.data.data)){
        const positionList = res.data.data.map((pos : any) => ({value : pos.id, label : pos.name}))
        setPositionOptions(positionList)
      }
    })
  },[])

  useEffect(() => {
    getMasterDataBanks().then(res => {
      const bankList = res.data.data.map((bank : any) => ({value : bank.id, label : bank.name}))
      setBankOptions(bankList)
    })
  },[])

  useEffect(() => {
    getAllTenant().then(res => {
      if(!isEmpty(res.data.data)) {
        const tenantList = res.data.data.map((tenant : any) => ({value : tenant.id, label : tenant.name}))
        setTenantOptions(tenantList)
      }
            
    })
  },[])

  const [initCertificate, setInitCertificate] = useState({})
  const [initWorkingContract, setInitWorkingContract] = useState({})
  const [initPositionEmployee, setInitPositionEmployee] = useState({})
  const [initDateOff, setInitDateOff] = useState({})




  useEffect(() => {
    if(!isEmpty(employeeData)) {
      
      setInitCertificate({
        certificate: 0,
        certificateLevel: 0,
        score: 0,
        employeeId: employeeData.id,
        isChange: false,
      })
      setInitWorkingContract({
        startTime: '',
        endTime: '',
        employeeId: employeeData.id,
        isChange: false,
      })
        
      setInitPositionEmployee({
        salaryLevel: 0,
        insurance: false,
        positionId : '',
        employeeId : employeeData.id,
        isChange: false,
      })
      setInitDateOff( {
        dayOfWeek: 0,
        halfDay: false,
        employeeId: employeeData.id,
        isChange: false,
      })
    }else{
      setInitCertificate({
        certificate: 0,
        certificateLevel: 0,
        score: 0,
        isChange: false,
      })
      setInitWorkingContract ( {
        startTime: '',
        endTime: '',
        isChange: false,
      })
      setInitPositionEmployee({
        positionId : '',
        salaryLevel: 0,
        insurance: false,
        isChange: false,
      })
      setInitDateOff({
        dayOfWeek: 0,
        halfDay: false,
        isChange: false,
      })
    }
  },[employeeData])

  

  const [showInfo, setShowInfo] = useState<boolean>(true)
  const [showInfoBanking, setShowInfoBanking] = useState<boolean>(true)
  const [showRelationInfo, setShowRelationInfo] = useState<boolean>(true)
  const [showEducationInfo, setShowEducationInfo] = useState<boolean>(true)
  const [showCentificateInfo, setCentificateInfo] = useState<boolean>(true)
  const [certificates, setCertificates] = useState<any>([initCertificate])
  const [workingContracts, setWorkingContracts] = useState([initWorkingContract])
  const [positionEmployees, setPositionEmployees] = useState([initPositionEmployee])
  const [dateOffs, setDateOffs] = useState([initDateOff])
  const [educations, setEducations] = useState([{degree : -1, level : -1, major : ''}])
  const [workingInfos, setWorkingInfos] = useState([{status : -1, tenantId : '', workType : -1}])
  const [isShowDate, setIsShowDate] = useState('')
  useEffect(() => {
    setCentificateInfo(true)
    setShowEducationInfo(true)
    setShowRelationInfo(true)
    setShowInfoBanking(true)
    setShowInfo(true)
    if (state) {
      getEmployeeById(state).then((res) => {
        console.log(res.data.data);
        
        if (!isEmpty(res.data.data.educations)) {
          const newEdu = res.data.data.educations.map((edu: any) => ({...edu, isChange: true}))
          setEducations(newEdu)
        }
        if (!isEmpty(res.data.data.certificateEmployees)) {
          const newCer = res.data.data.certificateEmployees.map((cer: any) => ({
            ...cer,
            isChange: true,
          }))
          setCertificates(newCer)
        }

        if (!isEmpty(res.data.data.workingContracts)) {
          const newCer = res.data.data.workingContracts.map((work: any) => ({
            ...work,
            isChange: true,
          }))
          setWorkingContracts(newCer)
        }

        if (!isEmpty(res.data.data.positionEmployees)) {
          const newCer = res.data.data.positionEmployees.map((pos: any) => ({
            ...pos,
            isChange: true,
          }))
          setPositionEmployees(newCer)
        }

        if (!isEmpty(res.data.data.dateOffs)) {
          const newCer = res.data.data.dateOffs.map((date: any) => ({...date, isChange: true}))
          setDateOffs(newCer)
        }

        if(!isEmpty(res.data.data.workingInfos)) {
          const newCer = res.data.data.workingInfos.map((work: any) => ({...work, isChange: true}))
          setWorkingInfos(newCer)
        }
      })
    }
  }, [state])


  const handleAddCompenent = (value: any, key: any) => {
    if (key === 'addCertificate') {
      setCertificates([...certificates, value])
    } else if (key === 'addWorkingContracts') {
      setWorkingContracts([...workingContracts, value])
    } else if (key === 'addPositionEmployee') {
      setPositionEmployees([...positionEmployees, value])
    } else if (key === 'addDateOffs') {
      setDateOffs([...dateOffs, value])
    }
  }

  const handleDeleteComponent = (value : number, key : string) => {
    if (key === 'deleteCertificate') {
      const list = certificates.filter((i : any, index :number) => index !== value)
      setCertificates(list)
    }else if(key === 'deleteWorkingContracts'){
      const list = workingContracts.filter((i : any, index :number) => index !== value)
      setWorkingContracts(list)
    }else if(key === 'deletePositionEmployee') {
      const list = positionEmployees.filter((i : any, index :number) => index !== value)
      setPositionEmployees(list)
    }else{
      const list = dateOffs.filter((i : any, index :number) => index !== value)
      setDateOffs(list)
    }
  }


  const validate = (values :  any) => {
    
      const errors = {
        fullName: '',
        username: '',
        gender: '',
        idNumber: '',
        dob: '',
        phoneNumber: '',
        maritalStatus: '',
        address: '',
        email: '',
        password: '',
        degree: '',
      }
    if(!values.user.fullName) {
      errors.fullName = 'Nhập họ và tên của bạn'
    }

    if(!values.user.username) {
      errors.username = 'Nhập tên tài khoản, viết liền không dấu'
    }

    if (values.user.gender === undefined || values.user.gender === -1) {
      errors.gender = 'Nhập giới tính'
    }

    if(!values.user.idNumber) {
      errors.idNumber = 'Nhập số căn cước công dân'
    }

    if(!values.user.dob) {
      errors.dob = 'Nhập ngày sinh'
    }

    if(!values.user.phoneNumber) {
      errors.phoneNumber = 'Nhập số điện thoại'
    }

    if(values.user.maritalStatus === undefined || values.user.maritalStatus === -1) {
      errors.maritalStatus = 'Nhập tình trạng hôn nhân'
    }

    if(!values.user.address) {
      errors.address = 'Nhập địa chỉ của bạn'
    }

    if(!values.user.email) {
      errors.email = 'Nhập địa chỉ mail'
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.user.email)) {
      errors.email = 'Địa chỉ email không đúng'
    }

    if(!values.user.password ) {
      errors.password = 'Nhập mật khẩu người dùng'
    }else if(/^[a-zA-Z]{2}[0-9]{8}$/.test(values.user.password)) {
      errors.password = 'Mật khẩu phải lớn hơn 8 chữ và chứa số và chữ'
    }

    return errors
  }
    

  const navigate = useNavigate()

  const handleSubmit = (e: any, values: any) => {
    e.preventDefault()
    const newCertificate = certificates.filter((certificate: any) => certificate.isChange)
    const newWorkingContracts = workingContracts.filter(
      (workingContract : any) => workingContract.isChange
    )
    const newPositionEmployees = positionEmployees.filter((pos : any) => pos.isChange)
    const newDateOffs = dateOffs.filter((dateOff : any) => dateOff.isChange)
    const newEducations = educations.filter((edu : any) => edu.isChange)
    const newWorkingInfos = workingInfos.filter((w : any) => w.isChange)
    let newEmployee = {
      ...values,
      ...values.user,
      id : employeeData.id || '',
      parentId: user.id,
      educations: newEducations,
      certificateEmployees: newCertificate,
      workingContracts: newWorkingContracts,
      positionEmployees: newPositionEmployees,
      dateOffs: newDateOffs,
      workingInfos: newWorkingInfos,
    }

    
    if (!state) {
      createEmployee(newEmployee).then((res) => {
        toast.success('Thêm thành công')
      })
    } else {      
      updateEmployee(state, newEmployee).then((res) => {
        toast.success('Cập nhật thành công')
      })
    }
  }

  const handleOpenInputDate = (type : string ) => {
    setIsShowDate(type)
  }

  const handleChangeValueList = (type: any, key: any, _index: number, value: any) => {
    if (type === 'certificate') {
      const cloneList = certificates.map((certificate: any, index: number) => {
        if (index === _index) {
          certificate[key] = value
          certificate.isChange = true
        }
        return certificate
      })
      cloneList.isChange = true
      setCertificates(cloneList)
    } else if (type === 'workingContracts') {
      const cloneList = workingContracts.map((workingContract: any, index: number) => {
        if (index === _index) {
          workingContract[key] = value
          workingContract.isChange = true
        }
        return workingContract
      })

      setWorkingContracts(cloneList)
    } else if (type === 'positionEmployee') {
      const cloneList = positionEmployees.map((pos: any, index: number) => {
        if (index === _index) {
          pos[key] = value
          pos.isChange = true
        }
        return pos
      })
      setPositionEmployees(cloneList)
    } else if (type === 'dateOffs') {
      const cloneList = dateOffs.map((dateOff: any, index: number) => {
        if (index === _index) {
          dateOff[key] = value
          dateOff.isChange = true
        }
        return dateOff
      })
      setDateOffs(cloneList)
    }else if (type === 'education') {
      const cloneList = educations.map((edu: any, index: number) => {
        if (index === _index) {
          edu[key] = value
          edu.isChange = true
        }
        return edu
      }) 
      setEducations(cloneList)
    }else if(type === 'workingInfos') {
      const cloneList = workingInfos.map((w: any, index: number) => {
        if (index === _index) {
          w[key] = value
          w.isChange = true
        }
        return w
      }) 
      setWorkingInfos(cloneList)
    }
  }

  
  return (
    <Formik
      enableReinitialize={true}
      initialValues={state ? employeeData : initEmployee}
      validate={validate}
      onSubmit={handleSubmit}
    >
      {({values, errors, touched, setFieldValue}) => (
        <Form className='employee-form' onSubmit={(e) => handleSubmit(e, values)}>
          <Row>
            <Col className='col-xl-8 col-12'>
              <div className='center-page card'>
                <div className='card-body'>
                  <div className='d-flex justify-content-center'>
                    <h2>TẠO NHÂN VIÊN MỚI</h2>
                  </div>
                  <div className='accordion accordion-icon-toggle' id='em_accordion_1'>
                    <div className='center-info'>
                      <div className='mb-5'>
                        <div
                          className='accordion-header py-3 d-flex'
                          data-bs-toggle='collapse'
                          data-bs-target='#em_accordion_1_item_1'
                        >
                          <span className='accordion-icon'>
                            <span className='svg-icon svg-icon-4'>
                              <SVG src={toAbsoluteUrl('/media/icons/duotune/arrows/arr064.svg')} />
                            </span>
                          </span>
                          <h3 className='fs-4 fw-bold mb-0 ms-4'>THÔNG TIN CƠ BẢN</h3>
                        </div>
                        <div id='em_accordion_1_item_1' className='fs-6 collapse show ps-10'>
                          {showInfo && (
                            <div className='mt-5'>
                              <Row className='mb-3'>
                                <Col>
                                  <div className='d-flex justify-content-center align-items-center form-group'>
                                    <label className='form-label required'>Họ và tên</label>
                                    <Col>
                                      <Field
                                        type='text'
                                        className='form-control'
                                        placeholder='Nhập họ và tên'
                                        name='user.fullName'
                                      />
                                      {errors.fullName && (
                                        <div className='error-text'>{errors.fullName}</div>
                                      )}
                                    </Col>
                                  </div>
                                </Col>
                                <Col>
                                  <div className='d-flex align-items-center form-group'>
                                    <label className='form-label required'>Giới tính </label>
                                    <Col>
                                      <Select
                                        key={'genderType'}
                                        className='basic-select w-100'
                                        classNamePrefix='select'
                                        isSearchable={true}
                                        options={GenderOptions}
                                        value={GenderOptions.find(
                                          (t) => t.value === values.user?.gender
                                        )}
                                        onChange={(e) => setFieldValue('user.gender', e?.value)}
                                      />
                                      {errors.gender && (
                                        <div className='error-text'>{errors.gender}</div>
                                      )}
                                    </Col>
                                  </div>
                                </Col>
                              </Row>
                              <Row className='mb-3'>
                                <Col>
                                  <div className='d-flex justify-content-center align-items-center form-group'>
                                    <label className='form-label required'>Số CCCD</label>
                                    <Col>
                                      <Field
                                        type='text'
                                        className='form-control'
                                        placeholder='Nhập số CCCD'
                                        name='user.idNumber'
                                      />
                                      {errors.idNumber && (
                                        <div className='error-text'>{errors.idNumber}</div>
                                      )}
                                    </Col>
                                  </div>
                                </Col>
                                <Col>
                                  <div className='d-flex justify-content-center align-items-center form-group'>
                                    <label className='form-label required'>Ngày sinh</label>

                                    <Col>
                                      {!state || isShowDate === 'dateOfBirth' ? (
                                        <>
                                          <Field
                                            type='date'
                                            className='form-control form-control-solid'
                                            placeholder='Nhập ngày sinh'
                                            name='user.dob'
                                            // value={moment(values.user?.dob).format('yyyy-MM-dd')}
                                          />
                                          {errors.dob && (
                                            <div className='error-text'>{errors.dob}</div>
                                          )}
                                        </>
                                      ) : (
                                        <div onClick={() => handleOpenInputDate('dateOfBirth')}>
                                          {moment(employeeData.user?.dob).format('DD/MM/YYYY')}
                                        </div>
                                      )}
                                    </Col>
                                  </div>
                                </Col>
                              </Row>
                              <Row className='mb-3'>
                                <Col>
                                  <div className='d-flex justify-content-center align-items-center form-group'>
                                    <label className='form-label required'>Số điện thoại</label>
                                    <Col>
                                      <Field
                                        type='text'
                                        className='form-control'
                                        placeholder='Nhập số SĐT'
                                        name='user.phoneNumber'
                                      />
                                      {errors.phoneNumber && (
                                        <div className='error-text'>{errors.phoneNumber}</div>
                                      )}
                                    </Col>
                                  </div>
                                </Col>
                                <Col>
                                  <div className='d-flex justify-content-center align-items-center form-group'>
                                    <label className='form-label required'>
                                      Tình trạng hôn nhân
                                    </label>
                                    <Col>
                                      <Select
                                        key={'maritalStatusType'}
                                        className='basic-select w-100'
                                        classNamePrefix='select'
                                        isSearchable={true}
                                        options={MaritalStatus}
                                        value={MaritalStatus.find(
                                          (t) => t.value === values.user?.maritalStatus
                                        )}
                                        onChange={(e) =>
                                          setFieldValue('user.maritalStatus', e?.value)
                                        }
                                      />
                                      {errors.maritalStatus && (
                                        <div className='error-text'>{errors.maritalStatus}</div>
                                      )}
                                    </Col>
                                  </div>
                                </Col>
                              </Row>
                              <Row className='mb-3'>
                                <Col>
                                  <div className='d-flex justify-content-center align-items-center form-group'>
                                    <label className='form-label required'>Nơi ở hiện tại</label>
                                    <Col>
                                      <Field
                                        type='text'
                                        className='form-control'
                                        placeholder='Nhập nơi ở hiện tại'
                                        name='user.address'
                                      />
                                      {errors.address && (
                                        <div className='error-text'>{errors.address}</div>
                                      )}
                                    </Col>
                                  </div>
                                </Col>
                                <Col>
                                  <div className='d-flex justify-content-center align-items-center form-group'>
                                    <label className='form-label required'>Email</label>
                                    <Col>
                                      <Field
                                        type='email'
                                        className='form-control'
                                        placeholder='Nhập email'
                                        name='user.email'
                                      />
                                      {errors.email && (
                                        <div className='error-text'>{errors.email}</div>
                                      )}
                                    </Col>
                                  </div>
                                </Col>
                              </Row>
                              {!state && (
                                <Row className='mb-3'>
                                  <div className='d-flex justify-content-center align-items-center form-group'>
                                    <label className='form-label'>Ghi chú</label>
                                    <Field
                                      type='text'
                                      className='form-control'
                                      placeholder='Ghi chú'
                                      name='user.note'
                                    />
                                  </div>
                                </Row>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className='mb-5'>
                        <div className='title-section'>
                          <div
                            className='accordion-header py-3 d-flex'
                            data-bs-toggle='collapse'
                            data-bs-target='#em_accordion_1_item_2'
                          >
                            <span className='accordion-icon'>
                              <span className='svg-icon svg-icon-4'>
                                <SVG
                                  src={toAbsoluteUrl('/media/icons/duotune/arrows/arr064.svg')}
                                />
                              </span>
                            </span>
                            <h3 className='fs-4 fw-bold mb-0 ms-4'>THÔNG TIN NGÂN HÀNG</h3>
                          </div>
                        </div>
                        <div id='em_accordion_1_item_2' className='fs-6 collapse show ps-10'>
                          {showInfoBanking && (
                            <div className='form-section'>
                              <Row className='mb-3'>
                                <Col>
                                  <div className='d-flex justify-content-center align-items-center form-group'>
                                    <label className='form-label'>Chủ tài khoản</label>
                                    <Col>
                                      <Field
                                        type='text'
                                        className='form-control'
                                        placeholder='Nhập tên tài khoản'
                                        name='bankAccount'
                                      />
                                      {/* {errors.bankAccount && (
                                        <div className='error-text'>{errors.bankAccount}</div>
                                      )} */}
                                    </Col>
                                  </div>
                                </Col>
                                <Col>
                                  <div className='d-flex justify-content-center align-items-center form-group'>
                                    <label className='form-label'>Số tài khoản</label>
                                    <Col>
                                      <Field
                                        type='text'
                                        className='form-control'
                                        placeholder='Nhập chi nhánh'
                                        name='bankNumber'
                                      />
                                      {/* {errors.bankNumber && (
                                        <div className='error-text'>{errors.bankNumber}</div>
                                      )} */}
                                    </Col>
                                  </div>
                                </Col>
                              </Row>
                              <Row className='mb-3'>
                                <Col>
                                  <div className='d-flex justify-content-center align-items-center form-group'>
                                    <label className='form-label'>Ngân hàng</label>
                                    <Col>
                                      <Select
                                        key={'maritalStatusType'}
                                        className='basic-select w-100'
                                        classNamePrefix='select'
                                        isSearchable={true}
                                        options={bankOptions}
                                        value={bankOptions.find((t) => t.value === values.bankName)}
                                        onChange={(e) => setFieldValue('bankName', e?.value)}
                                      />
                                    </Col>
                                  </div>
                                </Col>
                                <Col>
                                  <div className='d-flex justify-content-center align-items-center form-group'>
                                    <label className='form-label'>Chi nhánh</label>
                                    <Col>
                                      <Field
                                        type='text'
                                        className='form-control'
                                        placeholder='Nhập chi nhánh ngân hành'
                                        name='bankBranch'
                                      />
                                      {/* {errors.bankBranch && (
                                        <div className='error-text'>{errors.bankBranch}</div>
                                      )} */}
                                    </Col>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className='mb-5'>
                        <div className='title-section mt-15'>
                          <div
                            className='accordion-header py-3 d-flex'
                            data-bs-toggle='collapse'
                            data-bs-target='#em_accordion_1_item_3'
                          >
                            <span className='accordion-icon'>
                              <span className='svg-icon svg-icon-4'>
                                <SVG
                                  src={toAbsoluteUrl('/media/icons/duotune/arrows/arr064.svg')}
                                />
                              </span>
                            </span>
                            <h3 className='fs-4 fw-bold mb-0 ms-4'>THÔNG TIN NGƯỜI THÂN</h3>
                          </div>
                        </div>
                        <div id='em_accordion_1_item_3' className='fs-6 collapse show ps-10'>
                          {showRelationInfo && (
                            <div className='mt-5'>
                              <Row className='mb-3'>
                                <Col>
                                  <div className='d-flex justify-content-center align-items-center form-group'>
                                    <label className='form-label'>Họ và tên</label>
                                    <Field
                                      type='text'
                                      className='form-control'
                                      placeholder='Nhập họ và tên'
                                      name='relativeName'
                                    />
                                  </div>
                                </Col>
                                <Col>
                                  <div className='d-flex align-items-center form-group'>
                                    <label className='form-label'>Quan hệ</label>
                                    <Select
                                      key={'relationType'}
                                      className='basic-select w-100'
                                      classNamePrefix='select'
                                      isSearchable={true}
                                      options={RelationOptions}
                                      // value={RelationOptions.find(
                                      //   (t) => t.value === values.relationId
                                      // )}
                                      onChange={(e) => setFieldValue('relationId', e?.value)}
                                    />
                                  </div>
                                </Col>
                              </Row>
                              <Row className='mb-3'>
                                <Col>
                                  <div className='d-flex justify-content-center align-items-center form-group'>
                                    <label className='form-label'>Số điện thoại</label>
                                    <Field
                                      type='text'
                                      className='form-control'
                                      placeholder='Nhập số SĐT'
                                      name='relativePhoneNumber'
                                    />
                                  </div>
                                </Col>
                                <Col>
                                  <div className='d-flex align-items-center form-group'>
                                    <label className='form-label'>Email</label>
                                    <Field
                                      type='text'
                                      className='form-control'
                                      placeholder='Nhập Email'
                                      name='relativeEmail'
                                    />
                                  </div>
                                </Col>
                              </Row>
                              <Row className='mb-3'>
                                <div className='d-flex justify-content-center align-items-center form-group'>
                                  <label className='form-label'>Địa chỉ</label>
                                  <Field
                                    type='text'
                                    className='form-control'
                                    placeholder='Nhập địa chỉ'
                                    name='relativeAddress'
                                  />
                                </div>
                              </Row>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className='mb-5'>
                        <div
                          className='accordion-header py-3 d-flex'
                          data-bs-toggle='collapse'
                          data-bs-target='#em_accordion_1_item_4'
                        >
                          <span className='accordion-icon'>
                            <span className='svg-icon svg-icon-4'>
                              <SVG src={toAbsoluteUrl('/media/icons/duotune/arrows/arr064.svg')} />
                            </span>
                          </span>
                          <h3 className='fs-4 fw-bold mb-0 ms-4'>THÔNG TIN HỌC VẤN</h3>
                        </div>
                        <div id='em_accordion_1_item_4' className='fs-6 collapse show ps-10'>
                          {showEducationInfo && (
                            <>
                              {educations?.map((item: any, index: number) => (
                                <Row className='mb-3' key={index}>
                                  <Col className='col-6'>
                                    <div className='d-flex justify-content-center align-items-center form-group'>
                                      <label className='form-label required'>Trình độ</label>
                                      <Col>
                                        <Select
                                          key={'degreeEducationType'}
                                          className='basic-select w-100'
                                          classNamePrefix={'select'}
                                          isSearchable={true}
                                          options={DegreeEducationOptions}
                                          value={DegreeEducationOptions.find(
                                            (t) => t.value === item.degree
                                          )}
                                          onChange={(e: any) =>
                                            // setFieldValue('educations.degree', e?.value)
                                            handleChangeValueList(
                                              'education',
                                              'degree',
                                              index,
                                              e?.value
                                            )
                                          }
                                        ></Select>
                                      </Col>
                                    </div>
                                  </Col>
                                  <Col className='col-6'>
                                    <div className='d-flex justify-content-center align-items-center form-group'>
                                      <label className='form-label'>Loại tốt nghiệp</label>
                                      <Col>
                                        <Select
                                          key={'levelEdutionType'}
                                          className='basic-select w-100'
                                          classNamePrefix={'select'}
                                          isSearchable={true}
                                          options={LevelEducationsOptions}
                                          value={LevelEducationsOptions.find(
                                            (t) => t.value === item.level
                                          )}
                                          onChange={(e: any) =>
                                            handleChangeValueList(
                                              'education',
                                              'level',
                                              index,
                                              e?.value
                                            )
                                          }
                                        ></Select>
                                      </Col>
                                    </div>
                                  </Col>
                                  <Col className='my-5'>
                                    <div className='d-flex justify-content-center align-items-center form-group'>
                                      <label className='form-label'>Chuyên nghành</label>
                                      <Field
                                        type='text'
                                        className='form-control'
                                        value={item?.isChange ? item?.major : item?.name}
                                        onChange={(e: any) =>
                                          handleChangeValueList(
                                            'education',
                                            'major',
                                            index,
                                            e?.target.value
                                          )
                                        }
                                      />
                                    </div>
                                  </Col>
                                </Row>
                              ))}
                            </>
                          )}
                        </div>
                      </div>
                      <div className='mb-5'>
                        <div className='my-5 d-flex align-items-center justify-content-between'>
                          <div
                            className='accordion-header py-3 d-flex align-items-center'
                            data-bs-toggle='collapse'
                            data-bs-target='#em_accordion_1_item_5'
                          >
                            <span className='accordion-icon'>
                              <span className='svg-icon svg-icon-4'>
                                <SVG
                                  src={toAbsoluteUrl('/media/icons/duotune/arrows/arr064.svg')}
                                />
                              </span>
                            </span>
                            <h3 className='fs-4 fw-ld mbbo-0 ms-4'>CHỨNG CHỈ NGHỀ NGHIỆP</h3>
                          </div>
                          {!state && (
                            <div className='btn-add'>
                              <i
                                className='fa fa-plus'
                                aria-hidden='true'
                                onClick={() =>
                                  handleAddCompenent(initCertificate, 'addCertificate')
                                }
                              ></i>
                            </div>
                          )}
                        </div>
                        <div id='em_accordion_1_item_5' className='fs-6 collapse show ps-10'>
                          {showCentificateInfo && (
                            <>
                              {certificates.map((value: any, index: number) => (
                                <div key={index} className='mb-4'>
                                  {certificates.length > 1 && (
                                    <div
                                      className='btn-add'
                                      onClick={(e) =>
                                        handleDeleteComponent(index, 'deleteCertificate')
                                      }
                                    >
                                      <i className='fas fa-window-close'></i>
                                    </div>
                                  )}
                                  <Row className='mb-3'>
                                    <Col className='col-6'>
                                      <div className='d-flex justify-content-center align-items-center form-group'>
                                        <label className='form-label'>Tên chứng chỉ</label>
                                        <Col>
                                          <Select
                                            key={'certificateType'}
                                            className='basic-select w-100'
                                            classNamePrefix={'select'}
                                            isSearchable={true}
                                            options={CertificateOptions}
                                            value={
                                              value.isChange
                                                ? CertificateOptions.find(
                                                    (t) => t.value === value.certificate
                                                  )
                                                : value?.name
                                            }
                                            name='certificate'
                                            onChange={(e: any) => {
                                              handleChangeValueList(
                                                'certificate',
                                                'certificate',
                                                index,
                                                e?.value
                                              )
                                            }}
                                          ></Select>
                                        </Col>
                                      </div>
                                    </Col>
                                    <Col className='col-6'>
                                      <div className='d-flex justify-content-center align-items-center form-group'>
                                        <label className='form-label'>Xếp loại (nếu có)</label>
                                        <Col>
                                          <Select
                                            key={'centifivateLevelType'}
                                            className='basic-select w-100'
                                            classNamePrefix={'select'}
                                            isSearchable={true}
                                            options={CertificateLevelOptions}
                                            value={
                                              value.isChange
                                                ? CertificateLevelOptions.find(
                                                    (t) => t.value === value.certificateLevel
                                                  )
                                                : value?.name
                                            }
                                            onChange={(e: any) => {
                                              handleChangeValueList(
                                                'certificate',
                                                'certificateLevel',
                                                index,
                                                e?.value
                                              )
                                            }}
                                          ></Select>
                                        </Col>
                                      </div>
                                    </Col>
                                    <Col className='my-5'>
                                      <div className='d-flex justify-content-center align-items-center form-group'>
                                        <label className='form-label'>Điểm (nếu có)</label>
                                        <Field
                                          type='number'
                                          className='form-control'
                                          value={value?.isChange ? value?.score : value?.name}
                                          onChange={(e: any) =>
                                            handleChangeValueList(
                                              'certificate',
                                              'score',
                                              index,
                                              e?.target.value
                                            )
                                          }
                                        />
                                      </div>
                                    </Col>
                                  </Row>
                                  <hr />
                                </div>
                              ))}
                            </>
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
                      <h3 className='fs-4 fw-ld mbbo-0 ms-4'>THÔNG TIN LÀM VIỆC</h3>
                    </div>
                    {workingInfos.map((workingInfo: any, index: number) => (
                      <div key={index}>
                        <div className='mt-5'>
                          <Row className='mb-3'>
                            <div className='d-flex justify-content-center align-items-center form-group'>
                              <label className='form-label required'>Trạng thái</label>
                              <Col className='ms-5'>
                                <Select
                                  className='basic-select w-100'
                                  key={'statusType'}
                                  classNamePrefix='select'
                                  isSearchable={true}
                                  options={StatusOptions}
                                  value={StatusOptions.find((s) => s.value === workingInfo.status)}
                                  onChange={(e) =>
                                    handleChangeValueList('workingInfos', 'status', index, e?.value)
                                  }
                                ></Select>
                              </Col>
                            </div>
                          </Row>
                        </div>
                        <div className='mt-5'>
                          <Row className='mb-3'>
                            <div className='d-flex justify-content-center align-items-center form-group'>
                              <label className='form-label required'>Chi nhánh</label>
                              <Col className='my-5'>
                                <Select
                                  className='basic-select w-100'
                                  key={'tenantIdType'}
                                  classNamePrefix='select'
                                  isSearchable={true}
                                  options={tenantOptions && tenantOptions}
                                  value={
                                    workingInfo.isChange
                                      ? tenantOptions.find(
                                          (t: any) => t.value === workingInfo.tenantId
                                        )
                                      : workingInfo?.name
                                  }
                                  onChange={(e) =>
                                    handleChangeValueList(
                                      'workingInfos',
                                      'tenantId',
                                      index,
                                      e?.value
                                    )
                                  }
                                ></Select>
                              </Col>
                            </div>
                          </Row>
                        </div>
                        <div className='mt-5'>
                          <Row className='mb-3'>
                            <div className='d-flex justify-content-center align-items-center form-group'>
                              <label className='form-label required'>Hình thức làm việc</label>
                              <Col className='ms-5'>
                                <Select
                                  className='basic-select w-100'
                                  key={'workTypeType'}
                                  classNamePrefix='select'
                                  isSearchable={true}
                                  options={WorkTypeOptions}
                                  value={
                                    workingInfo.isChange
                                      ? WorkTypeOptions.find(
                                          (s) => s.value === workingInfo.workType
                                        )
                                      : workingInfo?.name
                                  }
                                  onChange={(e) =>
                                    handleChangeValueList(
                                      'workingInfos',
                                      'workType',
                                      index,
                                      e?.value
                                    )
                                  }
                                ></Select>
                              </Col>
                            </div>
                          </Row>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className='mb-3'>
                    <div className='my-5 d-flex align-items-center justify-content-between'>
                      <h3 className='fs-4 fw-ld mbbo-0 ms-4'>HỢP ĐỒNG LAO ĐỘNG</h3>
                      <div className='btn-add'>
                        <i
                          className='fa fa-plus'
                          aria-hidden='true'
                          onClick={() =>
                            handleAddCompenent(initWorkingContract, 'addWorkingContracts')
                          }
                        ></i>
                      </div>
                    </div>
                    {workingContracts.map((value: any, index: any) => (
                      <div>
                        <div className='mt-5'>
                          {workingContracts.length > 1 && (
                            <div
                              className='btn-add'
                              onClick={(e) =>
                                handleDeleteComponent(index, 'deleteWorkingContracts')
                              }
                            >
                              <i className='fas fa-window-close'></i>
                            </div>
                          )}
                          <Row className='mb-3'>
                            <div className='d-flex justify-content-center align-items-center form-group'>
                              <label className='form-label'>Hợp đồng</label>
                              <Col className='ms-5'>
                                <Field
                                  className='form-control'
                                  type='text'
                                  value={value?.name}
                                  onChange={(e: any) =>
                                    handleChangeValueList(
                                      'workingContracts',
                                      'contract',
                                      index,
                                      e?.target.value
                                    )
                                  }
                                />
                              </Col>
                            </div>
                          </Row>
                        </div>
                        <div className='mt-5'>
                          <Row className='mb-3'>
                            <div className='d-flex justify-content-center align-items-center form-group'>
                              <label className='form-label'>Bắt đầu</label>
                              <Col className='ms-5'>
                                {!value.isChange || isShowDate === 'startTime' ? (
                                  <Field
                                    type='date'
                                    className='form-control'
                                    name='startTime'
                                    value={value.isChange ? value.startTime : value?.name}
                                    onChange={(e: any) =>
                                      handleChangeValueList(
                                        'workingContracts',
                                        'startTime',
                                        index,
                                        e?.target.value
                                      )
                                    }
                                  />
                                ) : (
                                  <div onClick={() => handleOpenInputDate('startTime')}>
                                    {value.startTime
                                      ? moment(value.startTime).format('DD/MM/YYYY')
                                      : 'Chưa xác định'}
                                  </div>
                                )}
                              </Col>
                            </div>
                          </Row>
                        </div>
                        <div className='mt-5'>
                          <Row className='mb-3'>
                            <div className='d-flex justify-content-center align-items-center form-group'>
                              <label className='form-label'>Kết thúc</label>
                              <Col className='ms-5'>
                                {!value.isChange || isShowDate === 'endTime' ? (
                                  <Field
                                    type='date'
                                    className='form-control'
                                    name='endTime'
                                    value={value.isChange ? value.endTime : value?.name}
                                    onChange={(e: any) =>
                                      handleChangeValueList(
                                        'workingContracts',
                                        'endTime',
                                        index,
                                        e?.target.value
                                      )
                                    }
                                  />
                                ) : (
                                  <div onClick={() => handleOpenInputDate('endTime')}>
                                    {value.endTime
                                      ? moment(value.endTime).format('DD/MM/YYYY')
                                      : 'Chưa xác định'}
                                  </div>
                                )}
                              </Col>
                            </div>
                          </Row>
                        </div>
                        <hr />
                      </div>
                    ))}
                  </div>
                  <div className='mb-3'>
                    <div className='my-5 d-flex align-items-center justify-content-between'>
                      <h3 className='fs-4 fw-ld mbbo-0 ms-4'>THÔNG TIN CHỨC VỤ</h3>
                      <div className='btn-add'>
                        <i
                          className='fa fa-plus'
                          aria-hidden='true'
                          onClick={() =>
                            handleAddCompenent(initPositionEmployee, 'addPositionEmployee')
                          }
                        ></i>
                      </div>
                    </div>
                    {positionEmployees.map((value: any, index: any) => (
                      <div key={index}>
                        <div className='mt-5'>
                          {positionEmployees.length > 1 && (
                            <div
                              className='btn-add'
                              onClick={(e) =>
                                handleDeleteComponent(index, 'deletePositionEmployee')
                              }
                            >
                              <i className='fas fa-window-close'></i>
                            </div>
                          )}
                          <Row className='mb-3'>
                            <div className='d-flex justify-content-center align-items-center form-group'>
                              <label className='form-label'>Chức vụ</label>
                              <Col className='ms-5'>
                                <Select
                                  className='basic-select w-100'
                                  key={'positionType'}
                                  classNamePrefix='select'
                                  isSearchable={true}
                                  options={positionOptions && positionOptions}
                                  value={
                                    value.isChange
                                      ? positionOptions.find((t) => t.value === value.positionId)
                                      : value?.name
                                  }
                                  onChange={(e: any) =>
                                    handleChangeValueList(
                                      'positionEmployee',
                                      'positionId',
                                      index,
                                      e?.value
                                    )
                                  }
                                ></Select>
                              </Col>
                            </div>
                          </Row>
                        </div>
                        <div className='mt-5'>
                          <Row className='mb-3'>
                            <div className='d-flex justify-content-center align-items-center form-group'>
                              <label className='form-label'>Bậc lương</label>
                              <Col className='ms-5'>
                                <Select
                                  className='basic-select w-100'
                                  key={'salaryLevelType'}
                                  classNamePrefix='select'
                                  isSearchable={true}
                                  options={SalaryLevelOptions}
                                  value={
                                    value.isChange
                                      ? SalaryLevelOptions.find(
                                          (t) => t.value === value.salaryLevel
                                        )
                                      : value?.name
                                  }
                                  onChange={(e: any) =>
                                    handleChangeValueList(
                                      'positionEmployee',
                                      'salaryLevel',
                                      index,
                                      e?.value
                                    )
                                  }
                                ></Select>
                              </Col>
                            </div>
                          </Row>
                        </div>
                        <div className='mt-5'>
                          <Row className='mb-3'>
                            <div className='d-flex justify-content-center align-items-center form-group'>
                              <label className='form-label'>Đóng bảo hiểm</label>
                              <Col className='ms-5'>
                                <Field
                                  type='checkbox'
                                  name='insurance'
                                  checked={value?.insurance}
                                  onChange={(e: any) =>
                                    handleChangeValueList(
                                      'positionEmployee',
                                      'insurance',
                                      index,
                                      e?.target.checked
                                    )
                                  }
                                />
                              </Col>
                            </div>
                          </Row>
                        </div>
                        <hr />
                      </div>
                    ))}
                  </div>
                  <div className='mb-3'>
                    <div className='my-5 d-flex align-items-center justify-content-between'>
                      <h3 className='fs-4 fw-ld mbbo-0 ms-4'>NGÀY NGHỈ TRONG TUẦN</h3>
                      <div className='btn-add'>
                        <i
                          className='fa fa-plus'
                          aria-hidden='true'
                          onClick={() => handleAddCompenent(initDateOff, 'addDateOffs')}
                        ></i>
                      </div>
                    </div>
                    {dateOffs.map((value: any, index: any) => (
                      <div key={index}>
                        <div className='d-flex justify-content-between align-items-center'>
                          <div className='mt-5'>
                            {dateOffs.length > 1 && (
                              <div
                                className='btn-add'
                                onClick={(e) =>
                                  handleDeleteComponent(index, 'deleteDataOffs')
                                }
                              >
                                <i className='fas fa-window-close'></i>
                              </div>
                            )}
                            <Row className='mb-3'>
                              <div className='d-flex justify-content-center align-items-center form-group'>
                                <label className='form-label'>Thứ </label>
                                <Col className='ms-5'>
                                  <Select
                                    className='basic-select w-100'
                                    key={'dateOfWeekType'}
                                    classNamePrefix='select'
                                    isSearchable={true}
                                    options={DayofWeek}
                                    value={
                                      value.isChange
                                        ? DayofWeek.find((t) => t.value === value.dayOfWeek)
                                        : value?.name
                                    }
                                    onChange={(e: any) =>
                                      handleChangeValueList(
                                        'dateOffs',
                                        'dayOfWeek',
                                        index,
                                        e?.value
                                      )
                                    }
                                  ></Select>
                                </Col>
                              </div>
                            </Row>
                          </div>
                          <div className='mt-5 '>
                            <Row className='mb-3'>
                              <div className='d-flex justify-content-center align-items-center form-group'>
                                <label className='form-label'>Nửa ngày</label>
                                <Col className='ms-5'>
                                  <Field
                                    type='checkbox'
                                    name='halfDay'
                                    checked={value?.halfDay}
                                    onChange={(e: any) =>
                                      handleChangeValueList(
                                        'dateOffs',
                                        'halfDay',
                                        index,
                                        e?.target.checked
                                      )
                                    }
                                  />
                                </Col>
                              </div>
                            </Row>
                          </div>
                        </div>
                        <hr />
                      </div>
                    ))}
                  </div>
                  <div className='right-info'>
                    <div className='title-section'>
                      <h3 className='fs-4 fw-ld mbbo-0 ms-4'>THÔNG TIN TÀI KHOẢN</h3>
                    </div>
                    <div className='mt-5'>
                      <Row className='mb-3'>
                        <div className='d-flex justify-content-center align-items-center form-group'>
                          <label className='form-label required'>Tên đăng nhập</label>
                          <Col>
                            <Field
                              type='text'
                              className='form-control'
                              placeholder='username'
                              name='user.username'
                              disabled={state}
                            />
                            {errors.username ? (
                              <div className='error-text'>{errors.username}</div>
                            ) : null}
                          </Col>
                        </div>
                      </Row>
                      {!state && (
                        <Row className='mb-3'>
                          <div className='d-flex justify-content-center align-items-center form-group'>
                            <label className='form-label required'>Mật khẩu</label>
                            <Col>
                              <Field
                                type='password'
                                className='form-control'
                                placeholder='password'
                                name='user.password'
                                disabled={state}
                              />
                              {errors.password && (
                                <div className='error-text'>{errors.password}</div>
                              )}
                            </Col>
                          </div>
                        </Row>
                      )}
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

export default EmployeeForm
