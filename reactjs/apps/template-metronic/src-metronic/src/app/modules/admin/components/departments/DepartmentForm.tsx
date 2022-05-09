import {Field, Form, Formik} from 'formik'
import moment from 'moment'
import React, {useEffect, useState} from 'react'
import {Button, Col, Row} from 'react-bootstrap'
import {shallowEqual, useSelector} from 'react-redux'
import {useLocation, useNavigate} from 'react-router-dom'
import Select from 'react-select'
import {toast} from 'react-toastify'
import * as Yup from 'yup'
import {RootState} from '../../../../../setup'
import {UserModel} from '../../../auth/models/UserModel'
import {
  createDepartment,
  editDepartmentById,
  getAllDepartment,
  getDepartmentById,
} from '../../redux/DepartmentCRUD'
import {getServiceStates} from '../../redux/MasterDataCRUD'
import {styleSelectBox} from '../common/styles/StyleSelectBox'
import './styles/styles.scss'
const DepartmentForm: React.FC = () => {
  const user = useSelector<RootState, UserModel>(({auth}) => auth.user as UserModel, shallowEqual)
  const navigate = useNavigate()
  const location = useLocation() as any
  const {isCreate, data} = location.state
  const [departments, setDepartments] = useState([])
  const [serviceStates, setServiceStates] = useState([])
  const [initialValues, setInitialValues] = useState(data)
  const [isTenant, setIsTenant] = useState(initialValues.isTenant)
  const [isRoot, setIsRoot] = useState(initialValues.isRoot)
  const DepartmentSchema = Yup.object().shape({
    name: Yup.string().required('Nhập tên phòng ban'),
  })
  useEffect(() => {
    if (!isCreate) {
      getDepartmentById(data.id).then((res) => {
        setIsTenant(res.data.data.isTenant)
        setIsRoot(res.data.data.isRoot)
        setInitialValues({
          ...res.data.data,
          info: {
            ...res.data.data.info,
            createdDate: moment(res.data.data?.info?.createdDate).format('YYYY-MM-DD'),
          },
        })
      })
    }
    getServiceStates().then((res) => {
      setServiceStates(res.data.data)
    })
    getAllDepartment().then((res) => {
      setDepartments(res.data.data)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleSubmit = (values: any) => {
    let newData = {
      ...values,
      isTenant: isTenant,
      isRoot: isRoot,
      parentId: isRoot ? null : values.parent?.id,
      info: {
        serviceStateId: values.info.serviceState.id,
      },
    }
    if (isCreate) {
      createDepartment(newData).then((res) => toast.success('Thành Công !'))
    } else {
      if (
        values === initialValues &&
        isRoot === initialValues.isRoot &&
        isTenant === initialValues.isTenant
      ) {
        toast.warning('Chưa thay đổi thông tin !')
      } else {
        editDepartmentById(newData, data.id).then((res) => {
          toast.success(res.data.message)
          setInitialValues({
            ...res.data.updatedItem,
            info: {
              ...res.data.updatedItem.info,
              createdDate: moment(res.data.updatedItem?.info?.createdDate).format('YYYY-MM-DD'),
            },
          })
        })
      }
    }
  }
  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={DepartmentSchema}
      onSubmit={handleSubmit}
    >
      {({values, errors, touched, setFieldValue}) => (
        <Form className='department-form'>
          <Row>
            <Col className='col-xl-8 col-12'>
              <div className='card'>
                <div className='card-body form-detail'>
                  <div className='d-flex justify-content-center'>
                    <h3>{isCreate ? 'TẠO PHÒNG BAN MỚI' : 'THÔNG TIN PHÒNG BAN'}</h3>
                  </div>
                  <div className='mt-5'>
                    <Row className='mb-3'>
                      <Col>
                        <div className='d-flex justify-content-center align-items-start form-group'>
                          <label className='form-label mt-3 required'>Tên phòng ban</label>
                          <Col>
                            <Field
                              type='text'
                              className='form-control'
                              placeholder='Nhập tên phòng ban'
                              name='name'
                            />
                            {errors.name && <div className='text-error'>{errors.name}</div>}
                          </Col>
                        </div>
                      </Col>
                      <Col>
                        <div className='d-flex justify-content-center align-items-center form-group'>
                          <label className='form-label mt-2 required'>Chi nhánh</label>
                          <div className='form-check form-switch form-check-custom form-check-solid'>
                            <input
                              className='form-check-input'
                              type='checkbox'
                              checked={values.isTenant}
                              onChange={() => {
                                setFieldValue('isTenant', !values.isTenant)
                              }}
                            />
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row className='mb-3'>
                      <Col>
                        <div className='d-flex justify-content-start align-items-center form-group'>
                          <label className='form-label mt-2 required'>Cấp cao nhất</label>
                          <div className='form-check form-switch form-check-custom form-check-solid'>
                            <input
                              className='form-check-input'
                              type='checkbox'
                              checked={values.isRoot}
                              onChange={() => {
                                setFieldValue('isRoot', !values.isRoot)
                              }}
                            />
                          </div>
                          {/* <i
                            className={
                              isRoot
                                ? 'fa fa-toggle-on fa-toggle-icon'
                                : 'fa fa-toggle-off fa-toggle-icon'
                            }
                            onClick={() => setIsRoot(!isRoot)}
                          ></i> */}
                        </div>
                      </Col>
                      <Col>
                        {!isRoot && (
                          <div className='d-flex justify-content-start align-items-start form-group'>
                            <label className='form-label mt-3 required'>Phòng ban cấp trên</label>
                            <Col>
                              <Select
                                styles={styleSelectBox}
                                className='basic-select w-100'
                                options={departments}
                                defaultValue={initialValues?.parent}
                                getOptionLabel={(option: any) => option.name}
                                getOptionValue={(option: any) => option.id}
                                onChange={(e) => {
                                  setFieldValue('parent', e)
                                }}
                              />
                            </Col>
                          </div>
                        )}
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
                              name='description'
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
            <Col className={'col-xl-4 col-12'}>
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
                                options={serviceStates}
                                defaultValue={initialValues?.info?.serviceState}
                                getOptionLabel={(option: any) => option.name}
                                getOptionValue={(option: any) => option.id}
                                onChange={(e) => {
                                  setFieldValue('info.serviceState', e)
                                }}
                              />
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
                                    placeholder='Nhập tên phòng ban'
                                    name='info.createdDate'
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
                                    placeholder='Nhập tên người tạo'
                                    name='info.createdBy.username'
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
export default DepartmentForm
