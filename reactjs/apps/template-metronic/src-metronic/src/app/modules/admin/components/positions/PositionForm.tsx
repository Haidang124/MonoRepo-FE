import React from 'react'
import {Field, Form, Formik} from 'formik'
import {Button, Col, Row} from 'react-bootstrap'
import Select from 'react-select'
import * as Yup from 'yup'
import {createPosition, updatePosition} from '../../redux/PositionCRUD'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import {PositionModel, positionStatuses} from '../../models/PositionModel'
import SVG from 'react-inlinesvg'
import {toAbsoluteUrl} from '../../../../../_metronic/helpers'
import PositionDecentralization from './PositionDecentralization'
import {usePositionContext} from './PositionContext'

const PositionForm: React.FC = () => {
  const PositionSchema = Yup.object().shape({
    name: Yup.string().required('Nhập tên chức vụ'),
    abbreviation: Yup.string().required('Nhập tên viết tắt'),
    status: Yup.string().required('Nhập trạng thái'),
    departmentId: Yup.string().required('Nhập phòng ban'),
  })

  const navigate = useNavigate()

  const {position, departments, functionIds} = usePositionContext()

  const _departments = departments.map((department) => ({
    value: department.id,
    label: department.name,
  }))

  const handleSubmit = (values: PositionModel) => {
    const newPosition = {
      ...values,
      functionIds: functionIds,
    }
    if (!position.id) {
      createPosition(newPosition).then((res) => {
        if (res.status === 200) {
          toast('Thêm chức vụ thành công')
        }
      })
    } else {
      updatePosition(position.id, newPosition).then((res) => {
        if (res.status === 200) {
          toast('Cập nhật chức vụ thành công')
        }
      })
    }
  }

  return (
    <Formik
      enableReinitialize={true}
      initialValues={position}
      validationSchema={PositionSchema}
      onSubmit={handleSubmit}
    >
      {({values, errors, setFieldValue}) => (
        <Form>
          <Row>
            <Col xl={8} lg={12}>
              <div className='center-page card'>
                <div className='card-body center-info'>
                  <div className='d-flex justify-content-center'>
                    <h2>TẠO CHỨC VỤ MỚI</h2>
                  </div>
                  <div className='accordion accordion-icon-toggle' id='kt_accordion_2'>
                    <div className='mb-5'>
                      <div
                        className='accordion-header py-3 d-flex'
                        data-bs-toggle='collapse'
                        data-bs-target='#kt_accordion_2_item_1'
                      >
                        <span className='accordion-icon'>
                          <span className='svg-icon svg-icon-4'>
                            <SVG src={toAbsoluteUrl('/media/icons/duotune/arrows/arr064.svg')} />
                          </span>
                        </span>
                        <h3 className='fs-4 fw-bold mb-0 ms-4'>THÔNG TIN</h3>
                      </div>

                      <div id='kt_accordion_2_item_1' className='fs-6 collapse show ps-10'>
                        <Row className='mb-3'>
                          <label className='col-4 col-form-label required'>Tên vị trí</label>
                          <Col xs={8}>
                            <Field
                              type='text'
                              className='form-control'
                              placeholder='Nhập tên vị trí'
                              name='name'
                            />
                            {errors.name ? <div className='error-text'>{errors.name}</div> : null}
                          </Col>
                        </Row>
                        <Row className='mb-3'>
                          <label className='col-4 col-form-label required'>Viết tắt</label>
                          <Col xs={8}>
                            <Field
                              type='text'
                              className='form-control'
                              placeholder='Nhập viết tắt'
                              name='abbreviation'
                            />
                            {errors.abbreviation ? (
                              <div className='error-text'>{errors.abbreviation}</div>
                            ) : null}
                          </Col>
                        </Row>
                        <Row className='mb-3'>
                          <label className='col-4 col-form-label required'>Phòng ban</label>
                          <Col xs={8}>
                            <Select
                              isSearchable={true}
                              options={_departments}
                              value={_departments.find((d) => d.value === values.departmentId)}
                              onChange={(e) => {
                                setFieldValue('departmentId', e?.value)
                              }}
                            />
                            {errors.departmentId ? (
                              <div className='error-text'>{errors.departmentId}</div>
                            ) : null}
                          </Col>
                        </Row>
                        <Row className='mb-3'>
                          <label className='col-4 col-form-label'>Vị trí quản lý phòng ban</label>
                          <Col xs={8}>
                            <div className='form-check form-switch form-check-custom form-check-solid'>
                              <input
                                className='form-check-input'
                                type='checkbox'
                                checked={values.isManagerDepartment}
                                onChange={() => {
                                  setFieldValue('isManagerDepartment', !values.isManagerDepartment)
                                }}
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row className='mb-3'>
                          <label className='col-4 col-form-label'>Mô tả</label>
                          <Col xs={8}>
                            <Field
                              type='text'
                              className='form-control'
                              placeholder='Mô tả chi tiết về khóa học'
                              name='description'
                            />
                          </Col>
                        </Row>
                      </div>
                    </div>
                    <div className='mb-5'>
                      <div
                        className='accordion-header py-3 d-flex'
                        data-bs-toggle='collapse'
                        data-bs-target='#kt_accordion_2_item_2'
                      >
                        <span className='accordion-icon'>
                          <span className='svg-icon svg-icon-4'>
                            <SVG src={toAbsoluteUrl('/media/icons/duotune/arrows/arr064.svg')} />
                          </span>
                        </span>
                        <h3 className='fs-4 fw-bold mb-0 ms-4'>PHÂN QUYỀN</h3>
                      </div>

                      <div id='kt_accordion_2_item_2' className='fs-6 collapse show ps-10'>
                        <PositionDecentralization />
                      </div>
                    </div>
                  </div>

                  <div className='mt-5'></div>
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
            <Col xl={4} lg={12} className='right-mt'> 
              <div className='center-page card'>
                <div className='card-body'>
                  <div className='right-info'>
                    <Row className='mb-3'>
                      <label className='col col-form-label required'>Trạng thái</label>
                      <Col>
                        <Select
                          key={'statusType'}
                          className='basic-select w-100'
                          classNamePrefix='select'
                          isSearchable={true}
                          options={positionStatuses}
                          value={positionStatuses.find((t) => t.value === values.status)}
                          onChange={(e) => setFieldValue('status', e?.value)}
                        />
                        {errors.status ? <div className='error-text'>{errors.status}</div> : null}
                      </Col>
                    </Row>
                    <Row className='mb-3'>
                      <label className='col col-form-label'>Giáo viên</label>
                      <Col>
                        <div className='form-check form-switch form-check-custom form-check-solid'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            checked={values.isTeacher}
                            onChange={() => setFieldValue('isTeacher', !values.isTeacher)}
                          />
                        </div>
                      </Col>
                    </Row>
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
export default PositionForm
