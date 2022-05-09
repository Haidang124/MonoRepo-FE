import {Field, Form, Formik} from 'formik'
import moment from 'moment'
import React, {useEffect, useState} from 'react'
import {Button, Col, Row} from 'react-bootstrap'
import {useLocation, useNavigate} from 'react-router-dom'
import Select from 'react-select'
import {toast} from 'react-toastify'
import * as Yup from 'yup'
import {RootState} from '../../../../../setup'
import {UserModel} from '../../../auth/models/UserModel'
import {getManagerPositions, getProvinces, getServiceStates} from '../../redux/MasterDataCRUD'
import {createTenant, editTenantById, getTenantById} from '../../redux/TenantCRUD'
import {shallowEqual, useSelector} from 'react-redux'
import './styles/styles.scss'
import {styleSelectBox} from '../common/styles/StyleSelectBox'
const TenantForm: React.FC = () => {
  const user = useSelector<RootState, UserModel>(({auth}) => auth.user as UserModel, shallowEqual)
  const navigate = useNavigate()
  const location = useLocation() as any
  const {isCreate, data} = location.state
  const [provinces, setProvinces] = useState([])
  const [serviceStates, setServiceStates] = useState([])
  const [initialValues, setInitialValues] = useState(data)
  const [managerPositions, setManagerPositions] = useState([])
  const TenantSchema = Yup.object().shape({
    name: Yup.string().required('Nhập tên chi nhánh'),
    province: Yup.object().required('Chọn tỉnh thành'),
    tenantInfo: Yup.object().shape({
      managerPosition: Yup.object().required('Nhập vị trí quản lý'),
      serviceState: Yup.object().required('Nhập trạng thái'),
    }),
  })
  useEffect(() => {
    if (!isCreate) {
      getTenantById(data.id).then((res) => {
        setInitialValues({
          ...res.data.data,
          tenantInfo: {
            ...res.data.data.tenantInfo,
            createdDate: moment(res.data.data?.tenantInfo?.createdDate).format('YYYY-MM-DD'),
          },
        })
      })
    }
    getProvinces().then((res) => {
      setProvinces(res.data.data)
    })
    getServiceStates().then((res) => {
      setServiceStates(res.data.data)
    })
    getManagerPositions().then((res) => {
      setManagerPositions(res.data.data)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleSubmit = (values: any, e: any) => {
    let newData = {
      ...values,
      provinceId: values.province.id,
      tenantInfos: {
        managerId: user?.id,
        managerPositionId: values.tenantInfo.managerPosition.id,
        serviceStateId: values.tenantInfo.serviceState.id,
      },
    }
    if (isCreate) {
      createTenant(newData).then((res) => toast.success('Thành Công !'))
    } else {
      if (values !== initialValues) {
        editTenantById(newData, data.id).then((res) => {
          toast.success(res.data.message)
          setInitialValues({
            ...res.data.updatedItem,
            tenantInfo: {
              ...res.data.updatedItem.tenantInfo,
              createdDate: moment(res.data.updatedItem?.tenantInfo?.createdDate).format(
                'YYYY-MM-DD'
              ),
            },
          })
        })
      } else {
        toast.warning('Chưa thay đổi thông tin !')
      }
    }
  }
  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={TenantSchema}
      onSubmit={handleSubmit}
    >
      {({values, errors, touched, setFieldValue}) => (
        <Form className='tentant-form'>
          <Row>
            <Col className='col-xl-8 col-12'>
              <div className='card'>
                <div className='card-body form-detail'>
                  <div className='d-flex justify-content-center'>
                    <h3>{isCreate ? 'TẠO CHI NHÁNH MỚI' : 'THÔNG TIN CHI NHÁNH'}</h3>
                  </div>
                  <div className='mt-5'>
                    <Row className='mb-3'>
                      <Col>
                        <div className='d-flex justify-content-center align-items-start form-group'>
                          <label className='form-label mt-4 required'>Tên chi nhánh</label>
                          <Col>
                            <Field
                              type='text'
                              className='form-control'
                              placeholder='Nhập tên chi nhánh'
                              name='name'
                            />
                            {errors.name && <div className='text-error'>{errors.name}</div>}
                          </Col>
                        </div>
                      </Col>
                      <Col>
                        <div className='d-flex align-items-start form-group'>
                          <label className='form-label mt-4 required'>Tỉnh thành</label>
                          <Col>
                            <Select
                              className='basic-select w-100'
                              styles={styleSelectBox}
                              options={provinces}
                              defaultValue={data.province}
                              getOptionLabel={(option: any) => option.name}
                              getOptionValue={(option: any) => option.id}
                              onChange={(e) => {
                                setFieldValue('province', e)
                              }}
                            />
                            {errors.province && <div className='text-error'>{errors.province}</div>}
                          </Col>
                        </div>
                      </Col>
                    </Row>
                    <Row className='mb-3'>
                      <Col>
                        <div className='d-flex justify-content-center align-items-center form-group'>
                          <label className='form-label'>Số điện thoại</label>
                          <Col>
                            <Field
                              type='text'
                              className='form-control'
                              placeholder='Nhập tên chi nhánh'
                              name='phoneNumber'
                            />
                          </Col>
                        </div>
                      </Col>
                      <Col>
                        <div className='d-flex align-items-center form-group'>
                          <label className='form-label'>Email</label>
                          <Col>
                            <Field
                              type='email'
                              className='form-control'
                              placeholder='Nhập email'
                              name='email'
                            />
                          </Col>
                        </div>
                      </Col>
                    </Row>
                    <Row className='mb-3'>
                      <Col>
                        <div className='d-flex justify-content-center align-items-center form-group'>
                          <label className='form-label'>Địa chỉ</label>
                          <Col>
                            <Field
                              type='text'
                              className='form-control'
                              placeholder='Nhập địa chỉ'
                              name='address'
                            />
                          </Col>
                        </div>
                      </Col>
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
              <div className='card'>
                <div className='card-body'>
                  <div className='right-info'>
                    <div className='title-section d-flex justify-content-center'>
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
                                options={serviceStates}
                                defaultValue={data?.tenantInfo?.serviceState}
                                getOptionLabel={(option: any) => option.name}
                                getOptionValue={(option: any) => option.id}
                                onChange={(e) => {
                                  setFieldValue('tenantInfo.serviceState', e)
                                }}
                              />
                              {(errors.tenantInfo as any)?.serviceState && (
                                <div className='text-error'>
                                  {(errors.tenantInfo as any)?.serviceState}
                                </div>
                              )}
                            </Col>
                          </div>
                        </Col>
                      </Row>
                      <Row className='mb-3'>
                        <Col>
                          <div className='d-flex align-items-start form-group'>
                            <label className='form-label mt-4 required'>Vị trí quản lý</label>
                            <Col>
                              <Select
                                styles={styleSelectBox}
                                options={managerPositions}
                                defaultValue={data?.tenantInfo?.managerPosition}
                                getOptionLabel={(option: any) => option.name}
                                getOptionValue={(option: any) => option.id}
                                onChange={(e) => {
                                  setFieldValue('tenantInfo.managerPosition', e)
                                }}
                              />
                              {(errors.tenantInfo as any)?.managerPosition && (
                                <div className='text-error'>
                                  {(errors.tenantInfo as any)?.managerPosition}
                                </div>
                              )}
                            </Col>
                          </div>
                        </Col>
                      </Row>
                      {!isCreate && (
                        <>
                          <Row className='mb-3'>
                            <Col>
                              <div className='d-flex justify-content-center align-items-center form-group'>
                                <label className='form-label'>Ngày tạo</label>
                                <Col>
                                  <Field
                                    type='date'
                                    disabled
                                    className='form-control'
                                    placeholder='Nhập tên chi nhánh'
                                    name='tenantInfo.createdDate'
                                  />
                                </Col>
                              </div>
                            </Col>
                          </Row>
                          <Row className='mb-3'>
                            <Col>
                              <div className='d-flex justify-content-center align-items-center form-group'>
                                <label className='form-label'>Người tạo</label>
                                <Col>
                                  <Field
                                    type='text'
                                    disabled
                                    className='form-control'
                                    placeholder='Nhập tên chi nhánh'
                                    name='tenantInfo.createdBy.username'
                                  />
                                </Col>
                              </div>
                            </Col>
                          </Row>
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
        </Form>
      )}
    </Formik>
  )
}
export default TenantForm
