/* eslint-disable @typescript-eslint/no-unused-vars */
import {useFormik} from 'formik'
import React, {useEffect, useReducer, useState} from 'react'
import {Button, Col, Row} from 'react-bootstrap'
import {shallowEqual, useSelector} from 'react-redux'
import {useLocation, useNavigate} from 'react-router-dom'
import Select from 'react-select'
import {toast} from 'react-toastify'
import * as Yup from 'yup'
import {RootState} from '../../../../../setup'
import {GenderOptions, UserModel} from '../../../auth/models/UserModel'
import {
  getCentertypes,
  getDistrictsByProvinceId,
  getProvinces,
  getSaleChannels,
  getServiceStates,
  getSubjects,
} from '../../redux/MasterDataCRUD'
import {getAllServicePackage, getServicePackage} from '../../redux/ServiceCRUD'
import {createTrainingCenter, editTrainingCenterById} from '../../redux/TrainingCenterCRUD'
import './style/style.scss'
import {Center} from '../../models/TrainingCenterModel'
import {findPositions} from '../../redux/PositionCRUD'
import { styleSelectBox } from '../common/styles/StyleSelectBox'
import  SVG from 'react-inlinesvg'
import {toAbsoluteUrl} from '../../../../../_metronic/helpers' 

const centerFormSchema = Yup.object().shape({
  companyName: Yup.string().required('Nhập tên công ty'),
  representativeName: Yup.string().required('Nhập họ và tên người đại diện'),
  userName: Yup.string().required('Nhập tên đăng nhập'),
  // serviceState: Yup.string().required('Chọn trạng thái dịch vụ'),
  // servicePackage: Yup.string().required('Chọn gói dịch vụ'),
  // saleChannels: Yup.string().required('Chọn kênh bán hàng'),
  passWord: Yup.string()
    .min(10, 'Mật khẩu quá ngắn - tối thiểu phải có 10 ký tự.')
    .required('Nhập password'),
})

const CenterForm: React.FC = () => {
  const user = useSelector<RootState, UserModel>(({auth}) => auth.user as UserModel, shallowEqual)
  const navigate = useNavigate()
  const location = useLocation() as any
  const {isCreate, data} = location.state
  const [initialValues] = useState<Center>(data)
  const [masterData, setMasterData] = useReducer(
    (state: any, action: any) => ({...state, [action.name]: action.value}),
    {
      provinces: [],
      districts: [],
      subjects: [],
      centerTypes: [],
      positions: [],
      servicePackage: [],
      saleChannel: [],
      serviceState: [],
      userAssigned: [],
    }
  )
  const [masterDataValue, setMasterDataValue] = useReducer(
    (state: any, action: any) => ({...state, [action.name]: action.value}),
    {
      provinces: {},
      districts: {},
      subjects: {},
      centerTypes: {},
      positions: {},
      servicePackage: {},
      saleChannel: {},
      serviceState: {},
      userAssigned: {},
    }
  )
  const [isShowCenterInfo, setShowCenterInfo] = useState<boolean>(true)
  const [isShowRepresent, setShowRepresent] = useState<boolean>(true)
  const [isShowAccount, setShowAccount] = useState<boolean>(true)
  const handleSubmit = (values: any) => {
    let newData = {
      ...values,
      representative: {...values.representative, positionId: masterDataValue.positions?.id},
      serviceInfo: {
        ...values.serviceInfo,
        serviceStateId: masterDataValue.serviceState?.id,
        saleChannelId: masterDataValue.saleChannel?.id,
        userAssignedId: masterDataValue.userAssigned?.id || user.id,
        servicePackageId: masterDataValue.servicePackage?.id,
      },
      centerTypeId: masterDataValue.centerTypes?.id,
      subjectId: masterDataValue.subjects?.id,
      districtId: masterDataValue.districts?.id,
      login: {...values.user},
    }
    if (isCreate) {
      createTrainingCenter(newData).then((res) => {
        toast.success('Thành công !')
      })
    } else {
      editTrainingCenterById(newData, initialValues.id as string).then((res) => {
        toast.success('Thành công !')
      })
    }
  }
  useEffect(() => {
    getMasterData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const getMasterData = () => {
    if (!isCreate) {
      getDistrictsByProvinceId(initialValues.district?.provinceId as string).then((res) => {
        setMasterData({name: 'districts', value: res.data.data})
        setMasterDataValue({
          name: 'districts',
          value: res.data.data.find((t: any) => t.id === initialValues.district?.id),
        })
      })
    }
    getProvinces().then((res) => {
      setMasterData({name: 'provinces', value: res.data.data})
      setMasterDataValue({
        name: 'provinces',
        value: res.data.data.find((t: any) => t.id === initialValues.district?.provinceId),
      })
    })
    getSubjects().then((res) => {
      setMasterData({name: 'subjects', value: res.data.data})
      setMasterDataValue({
        name: 'subjects',
        value: res.data.data.find((t: any) => t.id === initialValues.subject?.id),
      })
    })
    getCentertypes().then((res) => {
      setMasterData({name: 'centerTypes', value: res.data.data})
      setMasterDataValue({
        name: 'centerTypes',
        value: res.data.data.find((t: any) => t.id === initialValues.centerType?.id),
      })
    })
    findPositions({name: '', page: 1, pageSize: 10}).then((res: any) => {
      setMasterData({name: 'positions', value: res.data.items})
      setMasterDataValue({
        name: 'positions',
        value: res.data.items.find((t: any) => t.id === initialValues.representative?.position?.id),
      })
    })
    getSaleChannels().then((res) => {
      setMasterData({name: 'saleChannel', value: res.data.data})
      setMasterDataValue({
        name: 'saleChannel',
        value: res.data.data.find((t: any) => t.id === initialValues.serviceInfo?.saleChannel?.id),
      })
    })
    getAllServicePackage({}).then((res) => {
      setMasterData({name: 'servicePackage', value: res.data.data})
      setMasterDataValue({
        name: 'servicePackage',
        value: res.data.data.find(
          (t: any) => t.id === initialValues.serviceInfo?.servicePackage?.id
        ),
      })
    })
    getServiceStates().then((res) => {
      setMasterData({name: 'serviceState', value: res.data.data})
      setMasterDataValue({
        name: 'serviceState',
        value: res.data.data.find((t: any) => t.id === initialValues.serviceInfo?.serviceState?.id),
      })
    })
  }
  const formik = useFormik<Center>({
    enableReinitialize: true,
    initialValues,
    validationSchema: centerFormSchema,
    onSubmit: (values) => handleSubmit(values),
  })
  return (
    <div id='form-center' className='center-form-page collapse show'>
      <form onSubmit={formik.handleSubmit} noValidate className='form d-flex'>
        <div className='form-main col-xl-8 col-12 card'>
          <div className='card-body'>
            <div className='title'>
              <h1 className='d-flex justify-content-center'>
                {isCreate ? 'TẠO TRUNG TÂM MỚI' : 'THÔNG TIN TRUNG TÂM'}
              </h1>
            </div>
            <div className='accordion accordion-icon-toggle' id='kt_accordion_3'>
              <div className='center-form-content'>
                <div className='center-info'>
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
                    <h3 className='fs-4 fw-bold mb-0 ms-4'>THÔNG TIN TRUNG TÂM</h3>
                  </div>
                  {/* <div className='title-section'>
                    <i
                      className='fas fa-caret-down'
                      onClick={() => setShowCenterInfo(!isShowCenterInfo)}
                    ></i>
                    <h3>THÔNG TIN TRUNG TÂM</h3>
                  </div> */}
                  <div id='kt_accordion_3_item_1' className='fs-6 collapse show ps-10'>
                    {isShowCenterInfo && (
                      <div className='mt-5'>
                        <Row className='mb-3'>
                          <div className='d-flex justify-content-center align-items-center form-group'>
                            <label className='form-label required'>Tên trung tâm</label>
                            <input
                              type='text'
                              className='form-control'
                              placeholder='Nhập tên trung tâm'
                              {...formik.getFieldProps('name')}
                            />
                          </div>
                        </Row>
                        <Row className='mb-3'>
                          <div className='d-flex justify-content-center align-items-center form-group'>
                            <label className='form-label'>Tên viết tắt</label>
                            <input
                              type='text'
                              className='form-control'
                              placeholder='Nhập tên viết tắt của trung tâm'
                              {...formik.getFieldProps('abbreviation')}
                            />
                          </div>
                        </Row>
                        <Row className='mb-3'>
                          <div className='d-flex justify-content-center align-items-center form-group'>
                            <label className='form-label'>Tên công ty</label>
                            <input
                              type='text'
                              className='form-control'
                              placeholder='Nhập tên công ty'
                              {...formik.getFieldProps('companyName')}
                            />
                          </div>
                        </Row>
                        <Row className='mb-3'>
                          <div className='d-flex justify-content-center align-items-center form-group'>
                            <label className='form-label'>Mã số thuê</label>
                            <input
                              type='text'
                              className='form-control'
                              placeholder='Nhập mã số thuê'
                              {...formik.getFieldProps('taxCode')}
                            />
                          </div>
                        </Row>
                        <Row className='mb-3'>
                          <Col>
                            <div className='d-flex justify-content-center align-items-center form-group'>
                              <label className='form-label'>Số điện thoại</label>
                              <input
                                type='text'
                                className='form-control'
                                placeholder='Nhập số điện thoại'
                                {...formik.getFieldProps('phoneNumber')}
                              />
                            </div>
                          </Col>
                          <Col>
                            <div className='d-flex justify-content-center align-items-center form-group'>
                              <label className='form-label'>Email</label>
                              <input
                                type='email'
                                className='form-control'
                                placeholder='Nhập email'
                                {...formik.getFieldProps('email')}
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row className='mb-3'>
                          <Col>
                            <div className='d-flex justify-content-center align-items-center form-group'>
                              <label className='form-label'>Tỉnh thành</label>
                              <Select
                                className='w-100'
                                styles={styleSelectBox}
                                value={masterDataValue.provinces}
                                options={masterData.provinces}
                                getOptionLabel={(option: any) => option.name}
                                getOptionValue={(option: any) => option.id}
                                onChange={(e: any) => {
                                  setMasterDataValue({name: 'provinces', value: e})
                                  getDistrictsByProvinceId(e?.id).then((res) => {
                                    setMasterData({name: 'districts', value: res.data.data})
                                  })
                                }}
                              />
                            </div>
                          </Col>
                          <Col>
                            <div className='d-flex justify-content-center align-items-center form-group'>
                              <label className='form-label'>Quận/Huyện</label>
                              <Select
                                className='w-100'
                                styles={styleSelectBox}
                                options={masterData.districts}
                                value={masterDataValue.districts}
                                getOptionLabel={(option: any) => option?.name}
                                getOptionValue={(option: any) => option?.id}
                                onChange={(e: any) => {
                                  setMasterDataValue({
                                    name: 'districts',
                                    value: e,
                                  })
                                }}
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row className='mb-3'>
                          <div className='d-flex justify-content-center align-items-center form-group'>
                            <label className='form-label'>Địa chỉ</label>
                            <input
                              type='text'
                              className='form-control'
                              placeholder='Nhập địa chỉ'
                              {...formik.getFieldProps('address')}
                            />
                          </div>
                        </Row>
                        <Row className='mb-3'>
                          <Col>
                            <div className='d-flex justify-content-center align-items-center form-group'>
                              <label className='form-label'>Mô hình</label>
                              <Select
                                className='w-100'
                                styles={styleSelectBox}
                                options={masterData.centerTypes}
                                value={masterDataValue.centerTypes}
                                getOptionLabel={(option: any) => option.name}
                                getOptionValue={(option: any) => option.id}
                                onChange={(e: any) => {
                                  setMasterDataValue({
                                    name: 'centerTypes',
                                    value: e,
                                  })
                                }}
                              />
                            </div>
                          </Col>
                          <Col>
                            <div className='d-flex justify-content-center align-items-center form-group'>
                              <label className='form-label'>Môn học</label>
                              <Select
                                className='w-100'
                                styles={styleSelectBox}
                                options={masterData.subjects}
                                value={masterDataValue.subjects}
                                getOptionLabel={(option: any) => option.name}
                                getOptionValue={(option: any) => option.id}
                                onChange={(e: any) => {
                                  setMasterDataValue({
                                    name: 'subjects',
                                    value: e,
                                  })
                                }}
                              />
                            </div>
                          </Col>
                        </Row>
                      </div>
                    )}
                  </div>
                </div>
                <div className='represent'>
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
                    <h3 className='fs-4 fw-bold mb-0 ms-4'>NGƯỜI ĐẠI DIỆN</h3>
                  </div>
                  {/* <div className='title-section'>
                    <i
                      className='fas fa-caret-down'
                      onClick={() => setShowRepresent(!isShowRepresent)}
                    ></i>
                    <h3>NGƯỜI ĐẠI DIỆN</h3>
                  </div> */}
                  <div id='kt_accordion_3_item_2' className='fs-6 collapse show ps-10'>
                    {isShowRepresent && (
                      <div className='mt-5'>
                        <Row className='mb-3'>
                          <Col>
                            <div className='d-flex justify-content-center align-items-center form-group'>
                              <label className='form-label required'>Họ và tên</label>
                              <input
                                type='text'
                                className='form-control'
                                placeholder='Nhập họ và tên'
                                {...formik.getFieldProps('representative.name')}
                              />
                            </div>
                          </Col>
                          <Col>
                            <div className='d-flex justify-content-center align-items-center form-group'>
                              <label className='form-label'>Chức vụ</label>
                              <Select
                                className='w-100'
                                styles={styleSelectBox}
                                options={masterData.positions}
                                value={masterDataValue.positions}
                                getOptionLabel={(option: any) => option.name}
                                getOptionValue={(option: any) => option.id}
                                onChange={(e: any) => {
                                  setMasterDataValue({
                                    name: 'positions',
                                    value: e,
                                  })
                                }}
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row className='mb-3'>
                          <Col>
                            <div className='d-flex justify-content-center align-items-center form-group'>
                              <label className='form-label'>Giới tính</label>
                              <Select
                                className='w-100'
                                styles={styleSelectBox}
                                options={GenderOptions}
                                value={GenderOptions.find(
                                  (t) => t.value === formik.values.representative?.gender
                                )}
                                onChange={(e: any) => {}}
                              />
                            </div>
                          </Col>
                          <Col>
                            <div className='d-flex justify-content-center align-items-center form-group'>
                              <label className='form-label'>Ngày sinh</label>
                              <input
                                type='date'
                                className='form-control'
                                placeholder='Nhập ngày sinh'
                                defaultValue={new Date(
                                  initialValues.representative?.doB as string
                                ).toLocaleDateString('en-CA')}
                                name='representative.doB'
                                onChange={formik.handleChange}
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row className='mb-3'>
                          <Col>
                            <div className='d-flex justify-content-center align-items-center form-group'>
                              <label className='form-label'>Số điện thoại</label>
                              <input
                                type='text'
                                className='form-control'
                                placeholder='Nhập số điện thoại'
                                {...formik.getFieldProps('representative.phone')}
                              />
                            </div>
                          </Col>
                          <Col>
                            <div className='d-flex justify-content-center align-items-center form-group'>
                              <label className='form-label'>Email</label>
                              <input
                                type='email'
                                className='form-control'
                                placeholder='Nhập email'
                                {...formik.getFieldProps('representative.email')}
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row className='mb-3'>
                          <div className='d-flex justify-content-center align-items-center form-group'>
                            <label className='form-label'>Địa chỉ</label>
                            <input
                              type='text'
                              className='form-control'
                              placeholder='Nhập địa chỉ'
                              {...formik.getFieldProps('representative.address')}
                            />
                          </div>
                        </Row>
                      </div>
                    )}
                  </div>
                </div>
                <div className='account'>
                  <div
                    className='accordion-header py-3 d-flex'
                    data-bs-toggle='collapse'
                    data-bs-target='#kt_accordion_3_item_3'
                  >
                    <span className='accordion-icon'>
                      <span className='svg-icon svg-icon-4'>
                        <SVG src={toAbsoluteUrl('/media/icons/duotune/arrows/arr064.svg')} />
                      </span>
                    </span>
                    <h3 className='fs-4 fw-bold mb-0 ms-4'>THÔNG TIN TÀI KHOẢN</h3>
                  </div>
                  {/* <div className='title-section'>
                    <i
                      className='fas fa-caret-down'
                      onClick={() => setShowAccount(!isShowAccount)}
                    ></i>
                    <h3>THÔNG TIN TÀI KHOẢN</h3>
                  </div> */}
                  <div id='kt_accordion_3_item_3' className='fs-6 collapse show ps-10'>
                    {isShowAccount && (
                      <div className='mt-5'>
                        <Row className='mb-3'>
                          <Col>
                            <div className='d-flex justify-content-center align-items-center form-group'>
                              <label className='form-label required'>Tên đăng nhập</label>
                              <input
                                type='text'
                                className='form-control'
                                placeholder='Nhập tên đăng nhập'
                                {...formik.getFieldProps('user.username')}
                              />
                            </div>
                          </Col>
                          <Col>
                            <div className='d-flex justify-content-center align-items-center form-group'>
                              <label className='form-label required'>Mật khẩu</label>
                              <input
                                type='password'
                                className='form-control'
                                placeholder='Nhập mật khẩu'
                                {...formik.getFieldProps('user.password')}
                              />
                            </div>
                          </Col>
                        </Row>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className='footer d-flex justify-content-end mt-4'>
              <Button className='btn btn-secondary' onClick={() => navigate(-1)}>
                Hủy bỏ
              </Button>
              <Button type='submit' className='btn btn-primary'>
                Hoàn tất
              </Button>
            </div>
          </div>
        </div>
        <div className='service-package-form'>
          <div className='service-package-info card mx-xl-4'>
            <div className='card-body p-2'>
              <div className='title d-flex justify-content-center'>
                <h1>THÔNG TIN DỊCH VỤ</h1>
              </div>
              <div className='service-package-form'>
                <Row className='mb-3'>
                  <div className='d-flex justify-content-center align-items-center form-group'>
                    <label className='form-label required'>Trạng thái</label>
                    <Select
                      className='w-100'
                      styles={styleSelectBox}
                      options={masterData.serviceState}
                      value={masterDataValue.serviceState}
                      getOptionLabel={(option: any) => option.name}
                      getOptionValue={(option: any) => option.id}
                      onChange={(e: any) => {
                        setMasterDataValue({
                          name: 'serviceState',
                          value: e,
                        })
                      }}
                    />
                  </div>
                </Row>
                <Row className='mb-3'>
                  <div className='d-flex justify-content-center align-items-center form-group'>
                    <label className='form-label required'>Gói dịch vụ</label>
                    <Select
                      className='w-100'
                      styles={styleSelectBox}
                      value={masterDataValue.servicePackage}
                      options={masterData.servicePackage}
                      getOptionLabel={(option: any) => option.name}
                      getOptionValue={(option: any) => option.id}
                      onChange={(e: any) => {
                        setMasterDataValue({
                          name: 'servicePackage',
                          value: e,
                        })
                      }}
                    />
                  </div>
                </Row>
                <Row className='mb-3'>
                  <div className='d-flex justify-content-center align-items-center form-group'>
                    <label className='form-label'>Người phụ trách</label>
                    <Select
                      className='w-100'
                      styles={styleSelectBox}
                      options={masterData.userAssigned}
                      value={masterDataValue.userAssigned}
                      getOptionLabel={(option: any) => option.name}
                      getOptionValue={(option: any) => option.id}
                      onChange={(e: any) => {
                        setMasterDataValue({
                          name: 'userAssigned',
                          value: e,
                        })
                      }}
                    />
                  </div>
                </Row>
                <Row className='mb-3'>
                  <div className='d-flex justify-content-center align-items-center form-group'>
                    <label className='form-label required'>Kênh bán hàng</label>
                    <Select
                      className='w-100'
                      styles={styleSelectBox}
                      options={masterData.saleChannel}
                      value={masterDataValue.saleChannel}
                      getOptionLabel={(option: any) => option.name}
                      getOptionValue={(option: any) => option.id}
                      onChange={(e: any) => {
                        setMasterDataValue({
                          name: 'saleChannel',
                          value: e,
                        })
                      }}
                    />
                  </div>
                </Row>
                <Row>
                  <label className='form-label required'>Người tạo</label>
                  <div className='avatar'>
                    <img
                      src='https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'
                      alt=''
                    />
                    <div className='user-info'>{user.username}</div>
                  </div>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CenterForm
